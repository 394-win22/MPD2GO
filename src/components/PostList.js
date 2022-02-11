import React from "react";
import Post from "./Post";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const PostList = ({ events, userList, user }) => {
  const userId = user ? user.uid : "";

  return (
    <>
      <Typography>Post Event</Typography>
      <Box sx={{ mx: "auto", maxWidth: "80%", minWidth: "100%" }}>
        <Post />
        <Post />
        <Post />
      </Box>
    </>
  );
};

export default PostList;
