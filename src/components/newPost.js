import {
  Button,
  Card,
  CardMedia,
  CardActions,
  IconButton,
  TextField,
  Grid,
  Container,
  Alert,
  Typography,
  LinearProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";
import Placeholder from "../img/placeholder.gif";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const NewPost = ({ createPost }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState([]);
  const [post, setPost] = useState({
    user: user.displayName,
    userUid: user.uid,
    mediaURL: "",
    poll1_description: "",
    poll2_description: "",
    vote_1: 0,
    vote_2: 0,
    createdAt: serverTimestamp(),
  });
  const [fileName, setFileName] = useState();

  const [progress, setProgress] = useState(0);

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(storage, `media/${file.name}`);
    setFileName(file.name);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAlertContent(["success", "File Uploaded"]);
          setAlert(true);
          handleChange("mediaURL", downloadURL);
        });
      }
    );
  };

  const deleteImg = (file) => {
    const fileRef = ref(storage, `media/${fileName}`);
    deleteObject(fileRef)
      .then(() => {
        handleChange("mediaURL", "");
        setAlertContent(["info", "File Deleted"]);
        setAlert(true);
      })
      .catch((error) => {
        setAlertContent(["error", "File Not Deleted, Please Try Again"]);
        setAlert(true);
      });
  };
  const navigate = useNavigate();

  const Input = styled("input")({
    display: "none",
  });

  const style = {
    margin: 0,
    top: 10,
    right: 20,
    left: "50%",
    transform: "translate(-50%, 0)",
    position: "fixed",
    zIndex: 10000,
  };

  const handleChange = (objectName, value) => {
    const newAnswer = { ...post, [objectName]: value };
    setPost(newAnswer);
  };

  const handlePost = () => {
    createPost(post);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      {alert ? (
        <Alert
          style={style}
          onClose={() => {
            setAlert(false);
          }}
          severity={alertContent[0]}
        >
          {alertContent[1]}
        </Alert>
      ) : (
        <></>
      )}
      <Grid container spacing={6}>
        <Grid item>
          {progress !== 0 && progress !== 100 ? (
            <LinearProgress variant="determinate" value={progress} />
          ) : (
            <></>
          )}
          <Typography variant="caption">Post Media</Typography>
          <Card>
            <CardMedia
              component="img"
              image={post.mediaURL === "" ? Placeholder : post.mediaURL}
            />
            <CardActions sx={{ justifyContent: "space-between" }}>
              <IconButton onClick={() => deleteImg(fileName)} color="warning">
                <Delete />
              </IconButton>
              <label htmlFor="overlay-upload">
                <Input
                  name="image"
                  accept="image/*"
                  type="file"
                  id="overlay-upload"
                  onChange={(e) => uploadFiles(e.target.files[0])}
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
        <Grid item xs={12}>
          <Typography variant="caption">Poll Descriptions</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} maxWidth>
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                label="Option 1"
                name="option1"
                value={post.poll1_description}
                onChange={(e) =>
                  handleChange("poll1_description", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} maxWidth>
              <TextField
                fullWidth
                variant="standard"
                color="secondary"
                label="Option 2"
                name="option2"
                value={post.poll2_description}
                onChange={(e) =>
                  handleChange("poll2_description", e.target.value)
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: "2em" }}>
          <Button onClick={() => handlePost()} variant="contained" fullWidth>
            Post
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewPost;
