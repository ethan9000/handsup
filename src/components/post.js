import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";

const Post = ({ post, updatePost }) => {
  const [total, setTotal] = useState(0);
  const [vote1Percent, setVote1Percent] = useState(0);
  const [vote2Percent, setVote2Percent] = useState(0);
  const [voteColor1, setVoteColor1] = useState();
  const [voteColor2, setVoteColor2] = useState();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setTotal(post.vote_1 + post.vote_2);
  }, [post.vote_1, post.vote_2]);

  const handleClick = (vote) => {
    if (vote === "vote_1") {
      updatePost(post.id, vote, post.vote_1 + 1);
      setVote1Percent(Math.round(((post.vote_1 + 1) / (total + 1)) * 100));
      setVote2Percent(Math.round((post.vote_2 / (total + 1)) * 100));
      if (post.vote_1 + 1 > post.vote_2) {
        setVoteColor1("#FF5714");
        setVoteColor2("#fff");
      } else {
        setVoteColor1("#FFF");
        setVoteColor2("#FF5714");
      }
      setClicked(true);
    } else {
      updatePost(post.id, vote, post.vote_2 + 1);
      setVote1Percent(Math.round((post.vote_1 / (total + 1)) * 100));
      setVote2Percent(Math.round(((post.vote_2 + 1) / (total + 1)) * 100));
      if (post.vote_1 > post.vote_2 + 1) {
        setVoteColor1("#FF5714");
        setVoteColor2("#fff");
      } else {
        setVoteColor1("#FFF");
        setVoteColor2("#FF5714");
      }
      setClicked(true);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src="https://picsum.photos/200" />}
        title={post.user}
      ></CardHeader>
      <CardMedia component="img" image={post.mediaURL} />
      <CardContent style={{ padding: "0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          {!clicked ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  width: "50%",
                  borderRightStyle: "solid",
                  borderRightColor: "#D1D1D1",
                  cursor: "pointer",
                }}
                onClick={() => handleClick("vote_1")}
              >
                <p>{post.poll1_description}</p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "50%",
                  cursor: "pointer",
                }}
                onClick={() => handleClick("vote_2")}
              >
                <p>{post.poll2_description}</p>
              </div>
            </>
          ) : (
            <></>
          )}
          {clicked ? (
            <>
              <div
                style={{
                  textAlign: "center",
                  width: `${vote1Percent}%`,
                  backgroundColor: `${voteColor1}`,
                }}
                onClick={() => handleClick("vote_1")}
              >
                <p>{post.poll1_description}</p>
                <p>{vote1Percent}%</p>
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: `${vote2Percent}%`,
                  background: `${voteColor2}`,
                }}
              >
                <p style={{ fontWieght: "bold" }}>{post.poll2_description}</p>
                <p style={{ fontWieght: "bold" }}>{vote2Percent}%</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;

// action={
//     <Button variant="outlined" size="sm">
//       Follow
//     </Button>
//   }
