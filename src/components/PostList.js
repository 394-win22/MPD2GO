import React from "react";
import Post from "./Post";
import { Typography, Grid, Box } from "@mui/material";

const PostList = ({ events, userList, user }) => {
  const userId = user ? user.uid : "";

  return (
    <>
      <Grid container align="center" sx={{ mx: "12% auto", minWidth:"90%",  }}>
        <Grid item xs={12} lg ={9} sx={{mx:"auto"}}>
          <Post />
        </Grid>
        <Grid item xs={12} lg ={9} sx={{mx:"auto"}}>
          <Post />
        </Grid>
        <Grid item xs={12} lg ={9} sx={{mx:"auto"}}>
          <Post />
        </Grid>
      </Grid>
    </>
  );
};

export default PostList;
