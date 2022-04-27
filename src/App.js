import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Profile from "./components/Profile";
import Register from "./Auth/register";
import VerifyEmail from "./Auth/verifyEmail";
import Login from "./Auth/login";
import { useState, useEffect } from "react";
import { AuthProvider } from "./Auth/AuthContext";
import { auth, db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./Auth/privateRoute";
import NewPost from "./components/newPost";
import { firestore } from "./firebase";
import Home from "./components/home";
import { collectionIdsAndDocs } from "./utilities";
import { create } from "@mui/material/styles/createTransitions";

function App() {
  // ACS - set the default state to the same data structure as the state variable. So for example [] for posts
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const snapshot = await firestore
        .collection("posts")
        .orderBy("createdAt", "desc")
        .get();
      const postSet = snapshot.docs.map(collectionIdsAndDocs);
      setPosts(postSet);
    };

    getPosts();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const updatePost = async (post, object, value) => {
    const docRef = doc(db, "posts", post);
    await updateDoc(docRef, {
      [object]: value,
    });
  };

  const createPost = async (post) => {
    const docRef = await firestore.collection("posts").add(post);
    const doc = await docRef.get();

    const newPost = collectionIdsAndDocs(doc);

    setPosts([newPost, ...posts]);
  };

  return (
    <Router>
      <AuthProvider value={{ currentUser, timeActive, setTimeActive }}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home posts={posts} updatePost={updatePost} />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <Profile posts={posts} updatePost={updatePost} />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/new-post"
            element={
              <PrivateRoute>
                <NewPost createPost={createPost} />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
