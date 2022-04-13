import "./App.css";
import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import PhotoGrid from "./components/photogrid";
import Follow from "./components/follow";
import UserName from "./components/username";
import Avatars from "./components/avatar";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative"> */}
      {/* <Toolbar> */}
      {/* <Typography variant="h6" color="inherit" noWrap> */}
      <Grid container spacing={0.1} direction="row">
        <Grid item xs={0.1} />
        <Box sx={{ fontSize: 38, fontWeight: "bold" }}>handsUP</Box>
        <Grid />
      </Grid>
      {/* </Typography> */}
      <div>
        <Grid container spacing={7} direction="row">
          <Grid item xs={11.5} />
          <IconButton
            edge="start"
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
            sx={{ mr: 2 }}
          >
            <AccountCircle sx={{ fontSize: 37 }} />
          </IconButton>

          <Grid />
        </Grid>
        <Avatars />
        <UserName />
        <Follow />
      </div>
      <PhotoGrid />
    </ThemeProvider>
  );
}

export default App;
