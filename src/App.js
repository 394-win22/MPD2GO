import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'

import theme from 'theme.js'
import LoggedIn from 'components/LoggedIn'
import { useUserState, getUserFromUid, saveUserToDb } from 'utilities/firebase.js'
import './App.css'
import Login from 'components/Login'

const App = () => {
  const user = useUserState();
  useEffect(() => {
    if (!user) return
    getUserFromUid(user.uid).then((userData) => {
      if (!userData) {
        saveUserToDb(user)
      }
    })
  }, [user])


  return (
    <ThemeProvider theme={theme}>
      {(user === undefined || user == null) ? (
        <Login />
      ) : (
        <LoggedIn user={user} />
      )
      }
    </ThemeProvider>
  )
}

export default App;
