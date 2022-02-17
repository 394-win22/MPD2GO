import { Button } from "@mui/material";
import { signInWithGoogle } from "../utilities/firebase.js";

const SignInButton = () => (
  <div>
    <p color="inherit" onClick={signInWithGoogle}>
      Sign In
    </p>
  </div>
);

export default SignInButton;
