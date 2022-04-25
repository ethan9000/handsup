// import "./profile.css";
import { useAuthValue } from "../Auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Nav } from "./nav";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
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
        <Avatar
          alt="Remy Sharp"
          src="https://picsum.photos/200"
          sx={{
            position: "absolute",
            height: "70px",
            width: "70px",
            top: 110,
            left: 190,
          }}
        />
        <Box sx={{ position: "absolute", top: 100, left: 270 }}>
          <p>
            <h1>{user.displayName}</h1>
          </p>
        </Box>
        <Button
          sx={{ position: "absolute", top: 128, left: 1240 }}
          color="primary"
          variant="contained"
          onClick={() => signOut(auth)}
        >
          Sign Out
        </Button>
      </div>
      <Container style={{ paddingTop: "8rem" }}>
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
