import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Box, MenuItem, ClickAwayListener, Badge } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  AccountCircle as AccountCircleIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Notifications as NotificationsIcon,
  NotificationsOutlined as NotificationsOutlinedIcon,
  Home as HomeIcon,
  HomeOutlined as HomeOutlinedIcon,
  AddCircle as AddCircleIcon,
  AddCircleOutlineOutlined as AddCircleOutlinedIcon,
  PeopleAlt as Directory,
  PeopleAltOutlined as DirectoryOutlined
} from "@mui/icons-material";
import { UserContext } from "components/Routing";

const theme = createTheme({
  palette: {
    foreground: "#ffffff",
    primary: {
      main: "#f1b844",
      contrastText: "#f3f3f3ff",
    },
    secondary: {
      main: "#808080",
      contrastText: "#f3f3f3ff"
    },
  },

})

const MobileBottomNavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const location = useLocation();
  const [, setAnchorEl] = useState(null);

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
              }}

            >
              {(location.pathname === "/") ? <HomeIcon color={"white"} /> : <HomeOutlinedIcon color={"white"} />}
            </MenuItem>

            {isLoggedIn && (
              <>
                <MenuItem onClick={() => {
                  navigate("/notifications")
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
                    {(location.pathname === "/notifications") ? <NotificationsIcon color={"white"} /> : <NotificationsOutlinedIcon color={"white"} />}
                  </Badge>
                </MenuItem>
                <MenuItem onClick={() => {
                  navigate("/createPost")
                }}>
                  {(location.pathname === "/createPost") ? <AddCircleIcon color={"white"} /> : <AddCircleOutlinedIcon color={"white"} />}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/directory");
                  }}
                >
                  {(location.pathname === "/directory") ? <Directory color={"white"} /> : <DirectoryOutlined color={"white"} />}

                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate("/profile");

                  }}
                >
                  {(location.pathname === "/profiles") ? <AccountCircleIcon color={"white"} /> : <AccountCircleOutlinedIcon color={"white"} />}
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
