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
import { useParams } from "react-router-dom";

function UserProfile({ posts, updatePost, updateFollowing, following }) {
  const { currentUser } = useAuthValue();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [userName, setUserName] = useState();
  const auth = getAuth();
  const user = auth.currentUser;
  const { id } = useParams();
  console.log(user);
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const [currentFollowing, setCurrentFollowing] = useState(false);
  // console.log(post.voted?.includes(currentUser.uid));

  useEffect(() => {
    if (following?.includes(id)) {
      setCurrentFollowing(true);
    }
  }, []);

  useEffect(() => {
    const getUserPosts = async () => {
      const snapshot = await firestore
        .collection("posts")
        .where("userUid", "==", id)
        .get();
      const postSet = snapshot.docs.map(collectionIdsAndDocs);
      setUserName(postSet[0].user);
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
            <h1>{userName}</h1>
          </p>
        </Box>

        {currentFollowing ? (
          <Button color="primary" variant="contained" disabled>
            Following
          </Button>
        ) : (
          <Button
            color="primary"
            variant="contained"
            onClick={() => updateFollowing(id)}
          >
            Follow
          </Button>
        )}
      </Box>
      <Container style={{ paddingTop: "6em" }}>
        <Grid container spacing={4}>
          {userPosts?.map((post) => (
            <Grid key={post.id} item xs={12} sm={6} md={4}>
              <Post
                post={post}
                updatePost={updatePost}
                currentUser={currentUser}
                following={following}
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

export default UserProfile;
