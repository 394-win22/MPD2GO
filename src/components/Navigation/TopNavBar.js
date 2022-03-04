import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

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
                <MenuItem onClick={() => navigate("/createPost")}>
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
                    navigate("/directory");
                  }}
                >
                  <PeopleAltIcon />
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    navigate("/profile");
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
