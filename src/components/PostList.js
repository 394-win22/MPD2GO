import React from "react";
import Post from "./Post";
import { Typography, Grid, Box } from "@mui/material";

const PostList = ({ events, userList, user }) => {
  const userId = user ? user.uid : "";

  return (
    <>
      <Typography>Post Event</Typography>
      <Grid container spacing={5} align="center" sx={{ mx: "auto", maxWidth: "80%" }}>
        <Grid item xs={12} md={6} xl={4}>
          <Post />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Post />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Post />
        </Grid>
      </Grid>
    </>
  );
};

export default PostList;
