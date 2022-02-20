import { Logout as LogoutIcon } from '@mui/icons-material'
import { ListItem } from '@mui/material'

import { signOut } from 'utilities/firebase.js'

const SignOutButton = () => (
  <div>
    <ListItem button onClick={signOut}>
      <LogoutIcon sx={{paddingRight: 2}}/>
      Sign out
    </ListItem>
  </div>
)

export default SignOutButton
