import * as React from "react";
import { useNavigate } from "react-router-dom";
// Bar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import SignOutButton from "../Login/SignOutButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

//icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Drawer
import ClickAwayListener from "@mui/material/ClickAwayListener";

const MobileBottomNavBar = ({ isLoggedIn }) => {
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

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
        <AppBar
          position="fixed"
          sx={{ top: "auto", bottom: 0 }}
          style={{ alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row", padding: "0px 30px" }}
        >

          <MenuItem onClick={() => {navigate("/");}}>
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

              <MenuItem onClick={() => {navigate("/profile");}}>
                  <AccountCircle />
              </MenuItem>
            </>
          )}
          <MenuItem onClick={handleDrawerOpen}>
              <MoreHorizIcon />
          </MenuItem>
        </AppBar>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleDrawerClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >

          <MenuItem onClick={handleDrawerClose}>
            <SignOutButton />
          </MenuItem>
        </Menu>

      </Box>
    </ClickAwayListener >
  );
};

export default MobileBottomNavBar;
