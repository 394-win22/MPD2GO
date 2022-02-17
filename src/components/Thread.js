import React, {useState} from "react";
import { Box } from "@mui/system";
import Comment from "./Comment.js"
import {Collapse, TextField, Button, IconButton} from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';

export default function Thread(props) {
	const [showTextField, setShowTextField] = useState(false)

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
							// submitComment();
						}
					}}
        />
				</Collapse>
				{(haveChild) && Object.values(props.data.threads).map((thread, i)=>{
					return <Thread style={{marginLeft: "40px"}} key={i} data={thread}/>})}
      </Box>
  );
}
