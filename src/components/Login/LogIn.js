import { Grid, Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import SignInButton from "./SignInButton";
import { logInWithEmailAndPassword } from "utilities/firebase";



const LogIn =() => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        logInWithEmailAndPassword(data.get('email'), data.get('password'));
        // console.log({
        //   email: data.get('email'),
        //   password: data.get('password'),
        // });
      };

    return (
        <Box sx={{ mt: 20, width: 200 }} >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1, backgroundColor: "white" }}
              onSubmit={handleSubmit}
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