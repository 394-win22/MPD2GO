import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar, Box, Menu, MenuItem, ClickAwayListener } from '@mui/material'
import { AccountCircle, Email as EmailIcon, Home as HomeIcon, MoreHoriz as MoreHorizIcon, AddCircle as AddCircleIcon } from '@mui/icons-material'

import SignOutButton from '../Login/SignOutButton'

const MobileBottomNavBar = ({ isLoggedIn }) => {
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
      <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
        <AppBar
          position='fixed'
          sx={{ top: 'auto', bottom: 0 }}
          style={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', padding: '0px 30px' }}
        >

          <MenuItem onClick={() => {navigate('/')}}>
              <HomeIcon />
          </MenuItem>

          {isLoggedIn && (
            <>
              <MenuItem disabled={true}>
                  <EmailIcon />
              </MenuItem>

              <MenuItem onClick={() => navigate('/createPost')}>
                  <AddCircleIcon />
              </MenuItem>

              <MenuItem onClick={() => {navigate('/profile')}}>
                  <AccountCircle />
              </MenuItem>
            </>
          )}
          <MenuItem onClick={handleDrawerOpen}>
              <MoreHorizIcon />
          </MenuItem>
        </AppBar>

        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleDrawerClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >

          <MenuItem onClick={handleDrawerClose}>
            <SignOutButton />
          </MenuItem>
        </Menu>

      </Box>
    </ClickAwayListener >
  )
}

export default MobileBottomNavBar
