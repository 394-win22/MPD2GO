import { Button } from "@mui/material";
import { signInWithGoogle } from "utilities/firebase.js";

const SignInButton = () => (
  <div>
    <Button
      fullWidth
      color="secondary"
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={signInWithGoogle}
    >
      LOG IN{" "}
    </Button>
  </div>
);

export default SignInButton;
