import { Toolbar, Typography, AppBar, Box } from '@mui/material'

import logo from '../../logo.png'

const MobileTopNavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative' sx={{ top: 'auto', top: 0 }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1, ml: 1 }}>
            <img src={logo} alt='Hive Logo' style={{ height: '3em' }} />
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MobileTopNavBar
