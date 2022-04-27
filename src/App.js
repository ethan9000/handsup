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
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import PrivateRoute from "./Auth/privateRoute";
import NewPost from "./components/newPost";
import { firestore } from "./firebase";
import Home from "./components/home";
import { collectionIdsAndDocs } from "./utilities";
import { create } from "@mui/material/styles/createTransitions";
import { async } from "@firebase/util";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [posts, setPosts] = useState();
  const [following, setFollowing] = useState([]);

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

  useEffect(() => {
    const getUserFollowing = async () => {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const data = docSnap.data();
        console.log(data.following);
        setFollowing(data.following);
        console.log("following pull" + following);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getUserFollowing();
  }, [currentUser]);

  const updatePost = async (post, object, value) => {
    const docRef = doc(db, "posts", post);
    await updateDoc(docRef, {
      [object]: value,
    });
  };

  const updateFollowing = async (value) => {
    setFollowing((currentFollowing) => {
      return [...currentFollowing, value];
    });

    const docRef = doc(db, "users", currentUser.uid);
    await updateDoc(docRef, {
      following: [...following, value],
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
                <Home
                  posts={posts}
                  updatePost={updatePost}
                  currentUser={currentUser}
                  following={following}
                  updateFollowing={updateFollowing}
                />
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
