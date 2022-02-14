import { Button } from "@mui/material";

import { signOut } from "../utilities/firebase.js";

const SignOutButton = () => (
  <div>
    <Button color="inherit" onClick={signOut}>
      Sign Out
    </Button>
  </div>
);

export default SignOutButton;
