import { Button } from '@mui/material'
import { signInWithGoogle } from 'utilities/firebase.js'
import GoogleIcon from '@mui/icons-material/Google';

const SignInButton = () => (
  <div>
    <Button
      color='secondary'
      fullWidth
      variant='contained'
      sx={{ mt: 3, mb: 2 }}
      onClick={signInWithGoogle}
      startIcon={<GoogleIcon/>}
    >
      
      Log In with Google{' '}
    </Button>
  </div>
)

export default SignInButton
