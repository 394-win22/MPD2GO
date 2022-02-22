import { Grid, Box, Paper, Typography, TextField, Button, Link, CssBaseline, styled } from "@mui/material";
import SignInButton from "./SignInButton";
import { logInWithEmailAndPassword } from "utilities/firebase";
import GoogleIcon from '@mui/icons-material/Google';



const LogIn =() => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        logInWithEmailAndPassword(data.get('email'), data.get('password'));
      };

    return (
        <Box sx={{ mt: 5, width: 300 }} >
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                variant="filled"
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
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                color='secondary'
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            <SignInButton />
            
          </Box>
    );
}

export default LogIn;