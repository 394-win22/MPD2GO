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
    <Box sx={{ mt: 5, width: 300 }} data-cy="Login">
      <Box component="form" noValidate onSubmit={handleSubmit}>
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
        />
        <Link
          variant="body2"
          sx={{ color: "white" }}
          onClick={handleModalOpen}
          data-cy="ForgotPasswordLink"
        >
          <Typography color="rgb(240, 242, 245)">Forgot password?</Typography>
        </Link>

        <Button
          id="submitLogin"
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 3 }}
        >
          Sign In
        </Button>
        <Divider>OR</Divider>
        <Button
          color="secondary"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={signInWithGoogle}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
      </Box>
      <ResetPasswordModal open={isModalOpen} handleClose={handleModalClose} />
    </Box>
  );
};

export default LogIn;
