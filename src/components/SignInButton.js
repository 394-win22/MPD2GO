import { Button } from "@mui/material";

import { signInWithGoogle } from "../utilities/firebase.js";

const SignInButton = () => (
  <div>
    <Button color="inherit" onClick={signInWithGoogle}>
      Sign In
    </Button>
  </div>
);

export default SignInButton;
