import { useMediaQuery } from '@mui/material'

import TopNavBar from './TopNavBar'
import MobileBottomNavBar from './MobileBottomNavBar'

const Navigation = ({ user }) => {
  const isDesktopScreen = useMediaQuery('(min-width:600px)');
  const isLoggedIn = user != null;

  if (!isDesktopScreen) {
    return (
      <>
        <TopNavBar isLoggedIn={isLoggedIn} isDesktopScreen={isDesktopScreen} />
        <MobileBottomNavBar isLoggedIn={isLoggedIn} />
      </>
    )
  }
  return <TopNavBar isLoggedIn={isLoggedIn} isDesktopScreen={isDesktopScreen} />
}

export default Navigation