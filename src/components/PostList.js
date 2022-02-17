import React from "react";
import Post from "./Post";
import { Typography, Grid, Box } from "@mui/material";

const PostList = ({ posts, users, user }) => {
  console.log(posts);
  //const userId = user ? user.uid : "";

  // return (
  //   <>
  //     <Grid container align="center" sx={{ mx: "12% auto", minWidth:"90%",  }}>
  //       <Grid item xs={12} md={9} sx={{mx:"auto"}}>
  //         <Post />
  //       </Grid>
  //       <Grid item xs={12} md={9} sx={{mx:"auto"}}>
  //         <Post />
  //       </Grid>
  //       <Grid item xs={12} md={9} sx={{mx:"auto"}}>
  //         <Post />
  //       </Grid>
  //     </Grid>
  //   </>
  // );

  return (
    <Box sx={{ mx: "auto" }}>
      {posts.map((post) => {
        return <Post user={user} posts={posts} users={users} key={post.id} post={post} />;
      })}
    </Box>
  );
};

export default PostList;
