import React from "react";
import Post from "./Post";
import { Box } from "@mui/material";

const PostList = ({ posts, users, user }) => {
  return (
    <Box sx={{ mx: "auto" }}>
      {posts.map((post) => {
        return <Post user={user} posts={posts} users={users} key={post.id} post={post} />;
      })}
    </Box>
  );
};

export default PostList;
