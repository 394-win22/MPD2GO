import { Toolbar, Button, AppBar, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from 'logo.png'

const MobileTopNavBar = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative' sx={{ top: 'auto' }}>
        <Toolbar>
          <Button sx={{ flexGrow: 1, ml: 1, display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }} onClick={() => { navigate('/') }}>
            <img src={logo} alt='Hive Logo' style={{ height: '3em' }} />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default MobileTopNavBar
