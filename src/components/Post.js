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

import { v4 as uuidv4 } from 'uuid'

import Thread from "./Thread"
import exampleData from "../exampleData.json"

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

const submitComment = (comment, author, postData) => {
  const commentId = uuidv4()  // Generate uuid
  const currentTime = Math.round(new Date().getTime() / 1000) 

  postData.threads[commentId] = {
    'comment': comment,
    'author': author,
    'threads': {},
    'time': currentTime
  }

  savePost(postData)
}

export default function Post({ posts, users, post }) {
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const user = getUserFromUID(post.author, users);

	console.log(user)

  return (
    <Card sx={{ m: 5 }}>
      <CardHeader
        align="left"
        avatar={<Avatar src={user.photoURL} aria-label="avatar"></Avatar>}
        title={user.displayName}
        subheader={moment(post.time).format("MMMM Do YYYY, h:mm a")}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="left">
          {post.description}
        </Typography>
      </CardContent>
        <CardContent align="left" style={{ backgroundColor: "#eceff1" }}>

					<Thread data={exampleData.posts["randomPostId"].threads["commentId"]}/>


        </CardContent>

      {/* Comment box start here */}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <Avatar aria-label="recipe">ICON</Avatar>
        </IconButton>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Add comments here"
          inputProps={{ 'aria-label': 'Add comments here' }}
          onChange={(e) => {setComment(e.target.value)}}
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton sx={{ p: '10px', paddingRight: '10px' }} aria-label="search">
          <SendIcon onClick={() => {console.log(comment)}}/>
        </IconButton>
      </Paper>
    </Card>
  );
}
// export default function Post({}) {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardActionArea>
//         <CardMedia
//           component="img"
//           height="140"
//           image="/static/images/cards/contemplative-reptile.jpg"
//           alt="green iguana"
//         />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             Lizard
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Lizards are a widespread group of squamate reptiles, with over 6,000
//             species, ranging across all continents except Antarctica
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }
