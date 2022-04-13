import { AppBar, Avatar, Toolbar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Logo from "../logo.svg";

export const Nav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} style={{ background: "#fff" }}>
        <Toolbar>
          <img src={Logo}></img>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <Avatar src="https://picsum.photos/200"></Avatar>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
