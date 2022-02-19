import * as React from "react";
// Bar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import logo from "../../logo.png"

const MobileTopNavBar = ({ isLoggedIn }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ top: "auto", top: 0 }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1, ml: 1 }}>
            <img src={logo} alt="Hive Logo" style={{ height: "3em" }} />
          </Typography>
          {/* <Typography
            variant="h5"
            component="div"
            align="left"
            sx={{ flexGrow: 1, paddingLeft: 1 }}
          >
            The Hive
          </Typography>         */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MobileTopNavBar;
