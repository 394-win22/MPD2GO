import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Divider,
  Link,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "utilities/firebase";
import ResetPasswordModal from "./ResetPasswordModal";

const LogIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    logInWithEmailAndPassword(data.get("email"), data.get("password"));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  return (
    <Box sx={{ mt: 4, width: 300 }} data-cy="Login">
      <Box component="form" noValidate onSubmit={handleSubmit}>

        <Button
          color="secondary"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 3 }}
          style={{ fontSize: "1.2em" }}
          onClick={signInWithGoogle}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
        <Divider color="white" style={{ border: "1px solid white" }} />
        <Typography color="rgb(240, 242, 245)" variant="h6" align="center" sx={{ mt: 2 }}>Sign in with Email</Typography>
        <TextField
          variant="filled"
          color="secondary"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          sx={{ color: "white" }}

          autoFocus
        />
        <TextField
          variant="filled"
          color="secondary"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          sx={{ color: "white" }}
        />

        <Button
          id="submitLogin"
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 3 }}
          data-testid="signin-button"
        >
          Sign In
        </Button>
        <Link
          variant="body2"
          sx={{ color: "white" }}
          onClick={handleModalOpen}
          data-cy="ForgotPasswordLink"
        >
          <Typography color="rgb(240, 242, 245)" align="center" style={{ fontWeight: "bold" }}> Forgot password?</Typography>
        </Link>

      </Box>
      <ResetPasswordModal open={isModalOpen} handleClose={handleModalClose} />
    </Box>
  );
};

export default LogIn;
