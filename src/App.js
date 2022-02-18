import "./App.css";
import React, { useState } from 'react';
import Login from "components/Login";

import {
  useUserState,
  getUserFromUid,
  saveUserToDb,
} from "utilities/firebase.js";
import { useEffect } from "react";
import { ThemeProvider } from '@mui/material/styles';
import theme from "theme.js"
import LoggedIn from "components/LoggedIn";

function App() {
  const user = useUserState();
  useEffect(() => {
    if (!user) return;
    getUserFromUid(user.uid).then((userData) => {
      if (!userData) {
        saveUserToDb(user);
      }
    });
  }, [user]);


  return (
    <ThemeProvider theme={theme}>
      {(user === undefined || user == null) ? (
        <Login />
      ) : (
        <LoggedIn user={user} />
      )
      }
    </ThemeProvider>
  );
}

export default App;
