import * as React from "react";
import { useNavigate } from "react-router-dom";
// Bar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SignOutButton from "../Login/SignOutButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

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
import { styled, useTheme, ThemeProvider } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import theme from "theme";

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

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  }));

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const ListIconButton = (props) => (
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
      <Box sx={{ flexGrow: 1, paddingBottom: 3, mb: 5 }}>
        <ThemeProvider theme={theme}>
          <AppBar
            position="fixed"
            sx={{ top: "auto", bottom: 0 }}
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "row",
              padding: "0px 30px",
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/");
              }}
            >
              <ListIconButton>
                <HomeIcon />
              </ListIconButton>
            </MenuItem>

            {isLoggedIn && (
              <>
                {/* enable when function done */}
                <MenuItem disabled={true}>
                  <ListIconButton>
                    <EmailIcon />
                  </ListIconButton>
                </MenuItem>

                <MenuItem onClick={() => navigate("/createPost")}>
                  <ListIconButton>
                    <AddCircleIcon />
                  </ListIconButton>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <ListIconButton>
                    <AccountCircle />
                  </ListIconButton>
                </MenuItem>
              </>
            )}
            <MenuItem onClick={handleDrawerOpen}>
              <ListIconButton>
                <MoreHorizIcon />
              </ListIconButton>
            </MenuItem>
          </AppBar>
        </ThemeProvider>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
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

export default MobileBottomNavBar;
