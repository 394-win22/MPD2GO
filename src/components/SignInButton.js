import { Button, ListItem } from "@mui/material";
import { signInWithGoogle } from "../utilities/firebase.js";

const SignInButton = () => (
  <div>
    <Button
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={signInWithGoogle}
    >
      Sign In{" "}
    </Button>
  </div>
);

export default SignInButton;
