import * as React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const Avatars = () => {
  return (
    <Grid container spacing={0.01} direction="row">
      <Grid item xs={4} container>
        <Grid item xs={7}></Grid>
        <Grid item xs={1.6} />
        <Grid item xs={2}>
          <Avatar
            alt="Remy Sharp"
            src="https://source.unsplash.com/random"
            sx={{ position: "absolute", top: 70, left: 340 }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Avatars;
