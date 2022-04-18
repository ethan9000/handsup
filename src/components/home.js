import { Container, Grid, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import Post from "./post";
import { useNavigate } from "react-router-dom";

const Home = ({ posts, updatePost }) => {
  const style = {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  };

  const navigate = useNavigate();
  return (
    <>
      <Container maxWidth="xs">
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid key={post.id} item xs={12}>
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
    </>
  );
};

export default Home;
