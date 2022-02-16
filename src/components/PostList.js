import React from "react";
import Post from "./Post";
import { Typography, Grid, Box } from "@mui/material";

const PostList = ({ posts, userList, user }) => {
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
    <Box sx={{ mx: "auto", width: 300 }}>
      {posts.map((post) => {
        console.log(post);
        return (
          
            <Post
              postList={posts}
              key={post.id}
              post={post}
            />
          
        );
      })}
    </Box>
  );
};

export default PostList;
