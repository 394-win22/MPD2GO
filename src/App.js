import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'

import theme from 'theme.js'
import Routing from 'components/Routing'
import { useUserState, getUserFromUid, saveUserToDb } from 'utilities/firebase.js'
import './App.css'
import Login from 'components/Login/index'

const App = () => {


  const user = useUserState()

  useEffect(async () => {
    if (user === undefined || user === null) return
    const userData = await getUserFromUid(user.uid)

    // If the user doesn't exist, create it
    if (userData === null)
      saveUserToDb(user)
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      {(user === undefined || user == null) ?
        <Login /> : <Routing user={user} />

      }

    </ThemeProvider>
  )
}

export default App
