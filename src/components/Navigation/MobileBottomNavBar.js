import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  ClickAwayListener,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material'
import {
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Home as HomeIcon,
  MoreHoriz as MoreHorizIcon,
  AddCircle as AddCircleIcon,
  Logout as LogoutIcon,
  PeopleAlt as Directory
} from '@mui/icons-material'
import { UserContext } from "components/Routing";

import { signOut } from 'utilities/firebase'

const MobileBottomNavBar = ({ isLoggedIn }) => {
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='fixed'
          sx={{ top: 'auto', bottom: 0 }}
          style={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', padding: '0px 30px' }}
        >

          <MenuItem onClick={() => { navigate('/') }}>
            <HomeIcon />
          </MenuItem>

          {isLoggedIn && (
            <>
              <MenuItem onClick={() => navigate('/notifications')}>
                <Badge badgeContent={notificationsCount} max={99} sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#e04141"
                  }
                }}>
                  <NotificationsIcon />
                </Badge>
              </MenuItem>
              <MenuItem onClick={() => navigate('/createPost')}>
                <AddCircleIcon />
              </MenuItem>
              <MenuItem onClick={() => { navigate('/directory') }}>
                <Directory />
              </MenuItem>
              <MenuItem onClick={() => { navigate('/profile') }}>
                <AccountCircleIcon />
              </MenuItem>
            </>
          )}

        </AppBar>



      </Box>
    </ClickAwayListener >
  )
}

export default MobileBottomNavBar
