import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopNavBar from "./DesktopNavBar";
import MobileBottomNavBar from "./MobileBottomNavBar";
import MobileTopNavBar from "./MobileTopNavBar";

const Navigation = ({ user }) => {
  const isDesktopScreen = useMediaQuery("(min-width:600px)");
  const isLoggedIn = user != null;

  if (isDesktopScreen) {
    return <DesktopNavBar isLoggedIn={isLoggedIn} />;
  }
  return (
    <>
      <MobileTopNavBar isLoggedIn={isLoggedIn} />{" "}
      <MobileBottomNavBar isLoggedIn={isLoggedIn} />
    </>
  );
};

export default Navigation;
