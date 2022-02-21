import { Button } from '@mui/material'
import { signInWithGoogle } from 'utilities/firebase.js'

const SignInButton = () => (
  <div>
    <Button
      color='secondary'
      fullWidth
      variant='contained'
      sx={{ mt: 3, mb: 2 }}
      onClick={signInWithGoogle}
    >
      LOG IN WITH GOOGLE{' '}
    </Button>
  </div>
)

export default SignInButton
