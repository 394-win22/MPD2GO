import * as React from 'react';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import Menu from '@mui/material/Menu';

import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { signInWithGoogle } from "../utilities/firebase.js";
import { useNavigate } from "react-router-dom";


const TopNavBar = ({ isLoggedIn, setQuery }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const navigate = useNavigate();

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
      <AppBar position="static" style={{ background: "#465a82" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            align="left"
            sx={{ flexGrow: 1, paddingLeft: 1 }}
          >
            MPD2Go
          </Typography>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </MenuItem>
          {isLoggedIn? 
            <MenuItem onClick={() => navigate("/createPost")}>
              <AddCircleIcon/>
            </MenuItem>
           : ""}
          <MenuItem>{isLoggedIn? <SignOutButton/> : <SignInButton/>}</MenuItem>
        </Toolbar>
      </AppBar>
      {/* {renderMenu} */}
    </Box>
  );
};

export default TopNavBar;
