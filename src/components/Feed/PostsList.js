import { Box } from "@mui/material";

import Post from "./Post";

const PostsList = ({ posts }) => {
  return (
    <Box sx={{ mx: "auto", pb: 10, mt: 2 }}>
      {posts.sort((a, b) => b.time - a.time).map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </Box>
  );
};

export default PostsList;
