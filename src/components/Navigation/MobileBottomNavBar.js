import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, MenuItem, ClickAwayListener, Badge } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  AddCircle as AddCircleIcon,
  PeopleAlt as Directory,
} from "@mui/icons-material";
import { UserContext } from "components/Routing";

const theme = createTheme({
  palette: {
    foreground: "#ffffff",
    primary: {
      main: "#f1b844",
      contrastText: "#f3f3f3ff",
    },
    secondary: { main: "#D4882E", 
    contrastText: "#f3f3f3ff" },
  },

  })

const MobileBottomNavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const [, setAnchorEl] = useState(null);
  const [activeIcon, setActiveIcon] = useState("");

  const handleClickAway = () => {
    setAnchorEl(null);
  };
  const userData = context.userList.find((x) => x.uid === context.user.uid);
  let notificationsCount = 0;
  if ("notifications" in userData)
    notificationsCount = Object.values(userData.notifications).length;

  return (
  <ThemeProvider theme={theme}>
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ flexGrow: 1 }}>
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
              setActiveIcon("home")
            }}
            
          >
      <HomeIcon color = {(activeIcon === "home") ? "secondary" : "white" }/>
          </MenuItem>

          {isLoggedIn && (
            <>
              <MenuItem onClick={() => {
                navigate("/notifications")
                setActiveIcon("notif")
                }}>
                <Badge
                  badgeContent={notificationsCount}
                  max={99}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#e04141",
                    },
                  }}
                >
                  <NotificationsIcon color = {(activeIcon === "notif") ? "secondary" : "white" }/>
                </Badge>
              </MenuItem>
              <MenuItem onClick={() => {
                navigate("/createPost") 
                setActiveIcon("createPost")}}>
                <AddCircleIcon  color = {(activeIcon === "createPost") ? "secondary" : "white" }/>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/directory");
                  setActiveIcon("directory");
                }}
              >
                <Directory color = {(activeIcon === "directory") ? "secondary" : "white" }/>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/profile");
                  setActiveIcon("profile");
                }}
              >
                <AccountCircleIcon color = {(activeIcon === "profile") ? "secondary" : "white" } />
              </MenuItem>
            </>
          )}
        </AppBar>
      </Box>
    </ClickAwayListener>
    </ThemeProvider>
  );
};

export default MobileBottomNavBar;
