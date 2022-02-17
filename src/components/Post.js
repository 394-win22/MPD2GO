import * as React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import moment from "moment";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { Typography, IconButton } from "@mui/material/";

import { makeStyles } from "@mui/styles";
const getUserFromUID = (uid, users) => {
  return users.filter((user) => user.uid === uid)[0];
};

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    '&:hover': {
      cursor: "pointer"
    }
  },

});


export default function Post({ posts, users, post }) {
  const classes = useStyles();
  const user = getUserFromUID(post.author, users);
  const navigate = useNavigate();

  return (
    <Card className={classes.card} sx={{ m: 5 }} onClick={() => { navigate(`/post/${post.id}`); }}>
      <CardHeader
        align="left"
        avatar={<Avatar src={user.photoURL} aria-label="avatar" />}
        title={user.displayName}
        subheader={moment(post.time).format("MMMM Do YYYY, h:mm a")} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="left">
          {post.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
