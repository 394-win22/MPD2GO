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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// Drawer
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const MobileTopNavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Drawer Consts
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const drawerWidth = 240;
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const handleClickAway = () => {
    setDrawerOpen(false);
  };

  const RenderIcon = (props) => (
    <IconButton
      size="medium"
      aria-haspopup="true"
      color="inherit"
      sx={{ marginLeft: -1, marginRight: -1 }}
    >
      {props.children}
    </IconButton>
  );

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
        <AppBar position="fixed" sx={{ top: "auto", top: 0 }}>
          <Toolbar>
            {/* <Typography
              variant="h5"
              component="div"
              align="left"
              sx={{ flexGrow: 1, paddingLeft: 1 }}
            >
              The Hive
            </Typography> */}
            <img
              src="logo.png"
              alt="The Hive Logo"
              sx={{ flexGrow: 1, paddingLeft: 1 }}
              style={{ height: "4em" }}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </ClickAwayListener>
  );
};

export default MobileTopNavBar;
