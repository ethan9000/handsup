import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Following from "./following";
import Discovery from "./discovery";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function Toggle({
  posts,
  updatePost,
  currentUser,
  updateFollowing,
  following,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: "#FF5714" } }}
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            label="Your Friends"
            {...a11yProps(0)}
            style={{ minWidth: 50 }}
          />
          <Tab
            label="Discovery"
            {...a11yProps(1)}
            style={{ minWidth: "50%" }}
          />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Following
            posts={posts}
            updatePost={updatePost}
            currentUser={currentUser}
            following={following}
            updateFollowing={updateFollowing}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Discovery
            posts={posts}
            updatePost={updatePost}
            currentUser={currentUser}
            following={following}
            updateFollowing={updateFollowing}
          />
        </TabPanel>
      </Box>
    </div>
  );
}
