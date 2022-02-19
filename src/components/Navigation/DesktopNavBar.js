import * as React from "react";
import { useNavigate } from "react-router-dom";
// Bar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SignOutButton from "../Login/SignOutButton";
import MenuItem from "@mui/material/MenuItem";
//icons
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Drawer
import Menu from "@mui/material/Menu";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import logo from "../../logo.png"

const DesktopNavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleDrawerClose = () => {
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const RenderIcon = (props) => (
    <IconButton size="medium" aria-haspopup="true" color="inherit">
      {props.children}
    </IconButton>
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
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
            </Typography> */}

            <MenuItem onClick={() => { navigate("/"); }}>
              <HomeIcon />
            </MenuItem>

            {isLoggedIn && (
              <>
                <MenuItem disabled={true}>
                  <EmailIcon />
                </MenuItem>

                <MenuItem onClick={() => navigate("/createPost")}>
                  <AddCircleIcon />
                </MenuItem>

                <MenuItem onClick={() => { navigate("/profile"); }}>
                  <AccountCircle />
                </MenuItem>
              </>
            )}
            <MenuItem onClick={handleDrawerOpen}>
              <MoreHorizIcon />
            </MenuItem>
          </Toolbar>
        </AppBar>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMenuOpen}
          onClose={handleDrawerClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleDrawerClose}>
            <SignOutButton />
          </MenuItem>
        </Menu>
      </Box>
    </ClickAwayListener>
  );
};

export default DesktopNavBar;
