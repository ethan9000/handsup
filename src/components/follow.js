import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const Follow = () => {
  return (
    <Grid container spacing={0.1} direction="row">
      <Grid item xs={12} container>
        <Grid item xs={7}></Grid>
        <Grid item xs={1.6} />
        <Grid item xs={2}>
          <Button variant="contained">follow</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default Follow;
