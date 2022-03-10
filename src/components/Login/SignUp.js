import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { registerWithEmailAndPassword } from "utilities/firebase";

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("password") !== data.get("passwordConfirmation")) {
      alert("Passwords don't match");
    } else {
      registerWithEmailAndPassword(
        `${data.get("firstName")} ${data.get("lastName")}`,
        data.get("email"),
        data.get("password")
      );
    }
  };

  return (
    <Box sx={{ mt: 3, width: 300 }}>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              color="secondary"
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="filled"
              color="secondary"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              color="secondary"
              required
              type="email"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              color="secondary"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="filled"
              color="secondary"
              required
              fullWidth
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              id="passwordConfirmation"
            />
          </Grid>
        </Grid>
        <Button
          color="secondary"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
