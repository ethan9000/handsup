// import "./profile.css";
import { useAuthValue } from "../Auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Nav } from "./nav";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { firestore } from "../firebase";
import { useState } from "react";
import { collectionIdsAndDocs } from "../utilities";
import { Container, Grid, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import Post from "./post";

function Profile({ posts, updatePost }) {
  const { currentUser } = useAuthValue();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  useEffect(() => {
    const getUserPosts = async () => {
      const snapshot = await firestore
        .collection("posts")
        .where("userUid", "==", user.uid)
        .get();
      const postSet = snapshot.docs.map(collectionIdsAndDocs);
      setUserPosts(postSet);
    };

    getUserPosts();
  }, []);

  return (
    <div className="center">
      <div className="profile">
        <h1>Profile</h1>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <p>
          <strong>Email verified: </strong>
          {`${currentUser?.emailVerified}`}
        </p>
        <span onClick={() => signOut(auth)}>Sign Out</span>
      </div>
      <Container style={{ paddingTop: "2em" }}>
        <Grid container spacing={4}>
          {userPosts?.map((post) => (
            <Grid key={post.id} item xs={3}>
              <Post post={post} updatePost={updatePost} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Fab
        onClick={() => navigate("/new-post")}
        style={style}
        color="primary"
        aria-label="add"
      >
        <Add />
      </Fab>
    </div>
  );
}

export default Profile;
