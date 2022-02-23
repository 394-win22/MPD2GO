import { Toolbar, Button, AppBar, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from 'logo.png'

const MobileTopNavBar = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar  sx={{ top: 0, position: "fixed" }}>
        <Toolbar>
          <Button sx={{ flexGrow: 1, ml: 1, display: "flex", justifyContent: "flex-start", alignItems: "flex-start" }} onClick={() => { navigate('/') }}>
            <img src={logo} alt='Hive Logo' style={{ height: '3em' }} />
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  )
}

export default MobileTopNavBar
