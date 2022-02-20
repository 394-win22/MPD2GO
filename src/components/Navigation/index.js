import { useMediaQuery } from '@mui/material'

import DesktopNavBar from './DesktopNavBar'
import MobileBottomNavBar from './MobileBottomNavBar'
import MobileTopNavBar from './MobileTopNavBar'

const Navigation = ({ user }) => {
  const isDesktopScreen = useMediaQuery('(min-width:600px)')
  const isLoggedIn = user != null

  if (isDesktopScreen) {
    return <DesktopNavBar isLoggedIn={isLoggedIn} />
  }
  return (
    <>
      <MobileTopNavBar />{' '}
      <MobileBottomNavBar isLoggedIn={isLoggedIn} />
    </>
  )
}

export default Navigation