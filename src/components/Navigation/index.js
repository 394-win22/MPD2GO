import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import DesktopNavBar from './DesktopNavBar';
import MobileBottomNavBar from './MobileBottomNavBar';
import MobileTopNavBar from './MobileTopNavBar';

const Navigation = () => {
    const isDesktopScreen = useMediaQuery('(min-width:600px)');

    if (isDesktopScreen) {
        return <DesktopNavBar />;
    }
    return <><MobileTopNavBar />  <MobileBottomNavBar /></>
}

export default Navigation;