import * as React from "react";
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
import { red } from "@mui/material/colors";
import Comment from "./Comment.js";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { savePost } from "../utilities/firebase.js";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SendIcon from '@mui/icons-material/Send';

import Thread from "./Thread"
import { addCommentToPost } from "../utilities/posts.js";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const getUserFromUID = (uid, users) => {
  return users.filter((user) => user.uid === uid)[0];
};


export default function Post({ posts, users, post }) {
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");
	// console.log(posts, users, post);
	const submitComment = () => {
		// console.log(comment);
		addCommentToPost(post.author, post.id, comment, [] );
		setComment("");
	}

  const user = getUserFromUID(post.author, users);

	function replyToComment () {
		console.log("replyToComment");
	}

  return (
    <Card sx={{ m: 5 }}>
      <CardHeader
        align="left"
        avatar={<Avatar src={user.photoURL} aria-label="avatar"></Avatar>}
        title={user.displayName}
        subheader={moment(post.time).format("MMMM Do YYYY, h:mm a")}/>
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="left">
          {post.description}
        </Typography>
      </CardContent>
        <CardContent align="left" style={{ backgroundColor: "#eceff1" }}>
					{("threads" in post && Object.values(post.threads).length > 0) &&
					(Object.values(post.threads).map((thread, i)=> {
						return (<Thread key={i} postId={post.id} data={thread} ids={[]}></Thread>)
					}))}
        </CardContent>

      {/* Comment box start here */}
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <Avatar aria-label="recipe"></Avatar>
        </IconButton>
        <TextField
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add comments here"
          inputProps={{ 'aria-label': 'Add comments here' }}
          onChange={(e) => {setComment(e.target.value)}}
					variant="standard"
					onKeyPress={(ev) => {
						if (ev.key === 'Enter') {
							// Enter clicked
							ev.preventDefault();
							submitComment();
						}
					}}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton  onClick={submitComment} sx={{ p: '10px', paddingRight: '10px' }} aria-label="search">
          <SendIcon/>
        </IconButton>
      </Paper>
    </Card>
  );
}
