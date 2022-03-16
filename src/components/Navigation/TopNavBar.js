import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  ClickAwayListener,
  MenuItem,
  Badge,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  AddCircle as AddCircleIcon,
  Notifications as NotificationsIcon,
  PeopleAlt as PeopleAltIcon,
} from "@mui/icons-material";
import logo from "resources/logo.png";
import { UserContext } from "components/Routing";

const TopNavBar = ({ isLoggedIn, isDesktopScreen }) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const [, setAnchorEl] = useState(null);

  const location = useLocation();
  const pathname= location.pathname;

  const onSamePage=(pathname, pathend)=>{
    const pieces= pathname.split("/");
    const lastPart = pieces[pieces.length-1];
    return (pathend === lastPart);
  }


  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const userData = context.userList.find((x) => x.uid === context.user.uid);
  let notificationsCount = 0;
  if ("notifications" in userData)
    notificationsCount = Object.values(userData.notifications).length;
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
        <AppBar sx={{ top: 0, position: "fixed" }}>
          <Toolbar>
            <Button
              sx={{
                flexGrow: 1,
                ml: 1,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <img
                src={logo}
                alt="Hive Logo"
                style={{ height: "3em" }}
                onClick={() => {
                  navigate("/");
                }}
              />
            </Button>

            {isDesktopScreen && isLoggedIn && (
              <>
                <MenuItem onClick={() => {
                  if (! onSamePage(pathname, "createPost")){
                    navigate("/createPost");
                  }
                    
                }
                  }>
                  <AddCircleIcon />
                </MenuItem>

                <MenuItem onClick={() => navigate("/notifications")}>
                  <Badge
                    badgeContent={notificationsCount}
                    max={99}
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "#e04141",
                      },
                    }}
                  >
                    <NotificationsIcon />
                  </Badge>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    if (! onSamePage(pathname, "directory")){
                      navigate("/directory");
                    }
                    
                  }}
                >
                  <PeopleAltIcon />
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    if (! onSamePage(pathname, "profile")){
                      navigate("/profile");
                    }
                    
                  }}
                >
                  <AccountCircleIcon />
                </MenuItem>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Toolbar />
      </Box>
    </ClickAwayListener>
  );
};

export default TopNavBar;
