import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  ClickAwayListener,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import {
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  MoreHoriz as MoreHorizIcon,
  AddCircle as AddCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'

import { signOut } from 'utilities/firebase'
import logo from 'logo.png'

const DesktopNavBar = ({ isLoggedIn }) => {
  const navigate = useNavigate()

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

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ flexGrow: 1, paddingBottom: 3, }}>
        <AppBar position='relative' sx={{ top: 'auto' }}>
          <Toolbar>
            <Button sx={{ flexGrow: 1, ml: 1, display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }} onClick={() => { navigate('/') }}>
              <img src={logo} alt='Hive Logo' style={{ height: '3em' }} />
            </Button>

            {isLoggedIn && (
              <>
                <MenuItem disabled={true}>
                  <EmailIcon />
                </MenuItem>

                <MenuItem onClick={() => navigate('/createPost')}>
                  <AddCircleIcon />
                </MenuItem>

                <MenuItem onClick={() => { navigate('/profile') }}>
                  <AccountCircleIcon />
                </MenuItem>
              </>
            )}
            <MenuItem onClick={handleDrawerOpen}>
              <MoreHorizIcon />
            </MenuItem>
          </Toolbar>
        </AppBar>

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

      </Box>
    </ClickAwayListener>
  )
}

export default DesktopNavBar
