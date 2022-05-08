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
import { Container, Grid, Fab, Avatar, Box } from "@mui/material";
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
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Avatar
            alt="Remy Sharp"
            src="https://picsum.photos/200"
            sx={{
              height: "70px",
              width: "70px",
            }}
          />

          <p>
            <h1>{user.displayName}</h1>
          </p>
        </Box>
        <Button
          color="primary"
          variant="contained"
          onClick={() => signOut(auth)}
        >
          Sign Out
        </Button>
      </Box>
      <Container style={{ paddingTop: "6em" }}>
        <Grid container spacing={4}>
          {userPosts?.map((post) => (
            <Grid key={post.id} item xs={3}>
              <Post
                post={post}
                updatePost={updatePost}
                currentUser={currentUser}
              />
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
    </Container>
  );
}

export default Profile;
