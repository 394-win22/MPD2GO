import { useState } from "react";
import { Grid, Box, Paper, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CssBaseline } from "@mui/material";

import logo from "resources/logo.png";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const useStyles = makeStyles({
  leftImg: {
    backgroundImage:
      "url(https://ideas.ted.com/wp-content/uploads/sites/3/2018/11/featured_art_loosetouch_yifan_wu.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  rightPanel: {
    margin: "64px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

const Login = () => {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.leftImg} />
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
        <Box className={classes.rightPanel}>
          <img src={logo} alt="Hive Logo" style={{ height: "10em" }} />

          {!isSignUp ? <LogIn /> : <SignUp />}

          <Link
            variant="body2"
            sx={{ color: "white" }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            <Typography color="rgb(240, 242, 245)" style={{fontWeight:"bold"}}>
              {isSignUp
                ? "Already have an account? Sign in"
                : "Create an Account"}
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
