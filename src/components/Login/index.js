import { useState } from "react";
import { Grid, Box, Paper, Typography, TextField, Button, Link } from "@mui/material";
import { CssBaseline } from "@mui/material";

import logo from "logo.png";
import LogIn from "./LogIn";
import SignUp from "./SignUp";



const Login = () => {
  const [signUpSwitcher, setSignUpSwitcher] = useState(false);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://ideas.ted.com/wp-content/uploads/sites/3/2018/11/featured_art_loosetouch_yifan_wu.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        backgroundColor="#f1b844"
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="Hive Logo" style={{ height: "10em" }} />
          {(!signUpSwitcher) ? <LogIn /> : <SignUp />}

          <Link
            variant="body2"
            sx={{ color: 'white' }}
            onClick={() => setSignUpSwitcher(!signUpSwitcher)}
          >
            <Typography color='rgb(240, 242, 245)'>
              {signUpSwitcher ? "Already have an account? Sign in" : "Don't have an account? Sign Up"}
            </Typography>
          </Link>

        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
