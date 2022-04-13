import {
  Button,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";
import Placeholder from "../img/placeholder.gif";

const NewPost = () => {
  const [post, setPost] = useState("");
  const [pollText, setPollText] = useState({
    poll1: "",
    poll2: "",
  });
  const deleteImg = () => {
    setPost("");
  };

  const Input = styled("input")({
    display: "none",
  });

  const handleChange = (objectName, value) => {
    const newAnswer = { ...pollText, ...{ [objectName]: value } };
    setPollText(newAnswer);
  };

  return (
    <Grid spacing={2} style={{ maxWidth: "30vw", margin: "auto" }}>
      <Grid item>
        <p className="editor-label">Image</p>
        <Card>
          <CardMedia component="img" image={post === "" ? Placeholder : post} />
          <CardActions sx={{ justifyContent: "space-between" }}>
            <IconButton onClick={() => deleteImg()} color="warning">
              <Delete />
            </IconButton>
            <label htmlFor="overlay-upload">
              <Input
                name="image"
                accept="image/*"
                type="file"
                id="overlay-upload"
                onChange={(e) => setPost(e.target.files[0])}
              />
              <div className="upload-content">
                <Button color="secondary" component="span">
                  Upload
                </Button>
              </div>
            </label>
          </CardActions>
        </Card>
      </Grid>
      <Grid item>
        <p className="editor-label">Poll</p>
        <Grid container spacing={2}>
          <Grid item xs={6} maxWidth>
            <TextField
              variant="standard"
              color="secondary"
              label="Option 1"
              name="option1"
              value={pollText.poll1}
              onChange={(e) => handleChange("poll1", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} maxWidth>
            <TextField
              variant="standard"
              color="secondary"
              label="Option 2"
              name="option2"
              value={pollText.poll2}
              onChange={(e) => handleChange("poll2", e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewPost;
