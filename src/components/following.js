import { Container, Grid, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import Post from "./post";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { firestore } from "../firebase";
import { useState } from "react";
import { collectionIdsAndDocs } from "../utilities";
import { getAuth } from "firebase/auth";

function Following({
  posts,
  updatePost,
  currentUser,
  updateFollowing,
  following,
}) {
  const [followingPosts, setFollowingPosts] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    const getUserPosts = async () => {
      const snapshot = await firestore
        .collection("posts")
        .where("userUid", "in", following)
        .get();
      const postSet = snapshot.docs.map(collectionIdsAndDocs);
      setFollowingPosts(postSet);
    };

    getUserPosts();
  }, []);
  const navigate = useNavigate();
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };
  return (
    <>
      <Container maxWidth="xs">
        <Grid container spacing={4}>
          {followingPosts?.map((post) => (
            <Grid key={post.id} item xs={12}>
              <Post
                post={post}
                updatePost={updatePost}
                currentUser={currentUser}
                following={following}
                updateFollowing={updateFollowing}
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
    </>
  );
}
export default Following;
