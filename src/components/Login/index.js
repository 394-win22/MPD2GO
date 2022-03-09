import { useState } from "react";
import { Grid, Box, Paper, Typography, Link, Button } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { CssBaseline } from "@mui/material";

import NotFound from "components/NotFound";
import Home from "./Home";
import Tutorial from "components/Tutorial";


const useStyles = makeStyles({

});

const Login = () => {
  const classes = useStyles();

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/tutorial" element={<Tutorial />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
};

export default Login;
