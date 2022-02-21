import { Grid, Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import SignInButton from "./SignInButton";



const LogIn =() => {
    return (
        <Box component="form" sx={{ mt: 20, width: 200 }}>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1, backgroundColor: "white" }}
            >
              <TextField
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