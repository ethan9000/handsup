import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          />

          <Typography
            align="left"
            variant="h4"
            component="div"
            sx={{ flexGrow: 29 }}
          >
            Handsup
          </Typography>
          <AccountCircle size="large" sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
