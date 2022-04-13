import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const UserName = () => {
  return (
    <Grid container spacing={0.01} direction="row">
      <Grid item xs={4} container>
        <Grid item xs={7}></Grid>
        <Grid item xs={1.6} />
        <Grid item xs={2}>
          <Box
            sx={{
              position: "absolute",
              top: 75,
              left: 390,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Username
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
};

export default UserName;
