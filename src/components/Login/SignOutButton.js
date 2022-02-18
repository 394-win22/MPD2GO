import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "utilities/firebase.js";
import ListItem from "@mui/material/ListItem";



const SignOutButton = () => (
  <div>
    {/* <Button color="inherit" onClick={signOut}>
      Sign Out
    </Button> */}

    <ListItem button onClick={signOut}>
      <LogoutIcon sx={{paddingRight: 2}}/>
      Sign out
    </ListItem>
  </div>
);

export default SignOutButton;
