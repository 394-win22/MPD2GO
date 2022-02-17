import * as React from "react";
import Card from "@mui/material/Card";
import { Avatar } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import Comment from "./Comment.js"

export default function Thread(props) {
	/*

	{author: ,
	comment,
	threads:
	time:
	}

	*/
// 	const childComponents = (
// 		props.data.threads.map((thread)=>{
// 			console.log(thread)
// 		// <Thread data={thread}/>
// })
	// )
	// console.log(props);
	const haveChild = ("threads" in props.data && Object.values(props.data.threads).length > 0);//&& props.data.threads.length > 0
	// console.log(Object.values(props.data.threads).length, haveChild);

	console.log(props.data)

  return (
      <Box style={props.style}>
				<Comment author={props.data.author} comment={props.data.comment} time={props.data.time}/>
				{(haveChild) && 	Object.values(props.data.threads).map((thread,i )=>{
					console.log(thread)
					return <Thread style={{marginLeft: "40px"}} key={i} data={thread}/>
	})
	}
      </Box>
  );
}
