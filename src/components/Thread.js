import React, {useState} from "react";
import { Box } from "@mui/system";
import Comment from "./Comment.js"
import {Collapse, TextField, Button} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import {replyToThread} from "../utilities/posts";

export default function Thread(props) {
	const [showTextField, setShowTextField] = useState(false)

	function replyToComment() {
		// console.log("replyToComment", props.ids, props.postId);
		// GENERATE A PATH TO PUSH TO IN DATABASE
		let path = `${props.postId}`;
		props.ids.forEach((id)=>{
			path += "/threads/"
			path += id;
		})
		path += "/threads/"
		// console.log(path);
		replyToThread(path)
	}

	const haveChild = ("threads" in props.data && Object.values(props.data.threads).length > 0);
  return (
      <Box style={props.style}>
				<Comment author={props.data.author} comment={props.data.comment} time={props.data.time}/>
				<Button color="primary" onClick={()=>{
					setShowTextField(!showTextField)}}>
						Reply
					<MessageIcon style={{marginLeft: "10px"}}/>
				</Button>
				<Collapse in={showTextField}>
				<TextField
          placeholder="Add comments here"
          inputProps={{ 'aria-label': 'Add comments here' }}
          // onChange={(e) => {setComment(e.target.value)}}
					variant="filled"
					onKeyPress={(ev) => {
						if (ev.key === 'Enter') {
							// Enter clicked
							ev.preventDefault();
							replyToComment();
						}
					}}
        />
				</Collapse>
				{(haveChild) && Object.entries(props.data.threads).map(([id, thread], i)=>{
					return <Thread style={{marginLeft: "40px"}} postId={props.postId} key={i} data={thread} ids={[...props.ids, id]}/>})}
      </Box>
  );
}
