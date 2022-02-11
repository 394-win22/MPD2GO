import React from "react";
import Post from "./Post";
import Box from "@mui/material/Box";

const PostList = ({ events, userList, user }) => {
  const userId = user ? user.uid : "";

  return (
    <Box sx={{ mx: "auto", width: 300 }}>
      {/* {events.map((event) => {
        return <Event key={event.id} event={event} />;
      })} */}
      <Post />
    </Box>
  );
};

export default PostList;
