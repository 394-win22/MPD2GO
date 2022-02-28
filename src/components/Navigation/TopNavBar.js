import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  ClickAwayListener,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material'
import {
  AccountCircle as AccountCircleIcon,
  MoreHoriz as MoreHorizIcon,
  AddCircle as AddCircleIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material'

import { signOut } from 'utilities/firebase'
import logo from 'logo.png'
import { UserContext } from "components/Routing";

const TopNavBar = ({ isLoggedIn, isDesktopScreen }) => {
  const navigate = useNavigate()
  const context = useContext(UserContext);

  const [anchorEl, setAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)

  const handleDrawerOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleDrawerClose = () => {
    setAnchorEl(null)
  }

  const handleClickAway = () => {
    setAnchorEl(null)
  }

  const userData = context.userList.find((x) => x.uid === context.user.uid);
  let notificationsCount = 0;
  if ("notifications" in userData) notificationsCount = Object.values(userData.notifications).length
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ flexGrow: 1, paddingBottom: 3, }}>
        <AppBar sx={{ top: 0, position: "fixed" }}>
          <Toolbar>
            <Button sx={{ flexGrow: 1, ml: 1, display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }} >
              <img src={logo} alt='Hive Logo' style={{ height: '3em' }} onClick={() => { navigate('/') }} />
            </Button>

            {isDesktopScreen && isLoggedIn && (
              <>
                <MenuItem onClick={() => navigate('/createPost')}>
                  <AddCircleIcon />
                </MenuItem>

                <MenuItem onClick={() => navigate('/notifications')}>
                  <Badge badgeContent={notificationsCount} max={99} sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#e04141"
                    }
                  }}>
                    <NotificationsIcon />
                  </Badge>
                </MenuItem>

                <MenuItem onClick={() => { navigate('/profile') }}>
                  <AccountCircleIcon />
                </MenuItem>

                <MenuItem onClick={handleDrawerOpen}>
                  <MoreHorizIcon />
                </MenuItem>
                <Menu
                  id='basic-menu'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isMenuOpen}
                  onClose={handleDrawerClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={signOut}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText>Sign out</ListItemText>
                  </MenuItem>
                </Menu>
              </>
            )}

          </Toolbar>
        </AppBar>

        <Toolbar />
      </Box>
    </ClickAwayListener >
  )
}

export default TopNavBar
