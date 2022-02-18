import React, { useState } from "react";
import { Box } from "@mui/system";
import Comment from "./Comment.js"
import { Collapse, TextField, Button } from "@mui/material";
import MessageIcon from '@mui/icons-material/Message';
import { replyToThread } from "../../utilities/posts";
import { UserContext } from "../../App";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
	threadContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		marginBottom: "15px"
	},
	collapseButton: {
		display: "flex",
		minHeight: "100%",
		width: "20px",
		boxSizing: "border-box",
		justifyContent: "center",
		alignItems: "center",
		// borderLeft: "2px solid grey",
		// backgroundColor: "red",
		'&:hover': {
			cursor: "pointer"
		}
	},
	collapseLine: {
		minHeight: "100%",
		width: "5px",
		backgroundColor: "gray",
		boxSizing: "border-box",
		'&:hover': {
			cursor: "pointer"
		}
	},
	verticalContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start"
	},
	rowContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "flex-start"
	}

});
function Thread(props) {
	const classes = useStyles();
	const [showTextField, setShowTextField] = useState(false)
	const [showThreads, setShowThreads] = useState(true)

	const user = React.useContext(UserContext).user;
	const [comment, setComment] = React.useState("");

	function replyToComment() {
		// GENERATE A PATH TO PUSH TO IN DATABASE
		let path = `${props.postId}`;
		props.ids.forEach((id) => {
			path += "/threads/"
			path += id;
		})
		path += "/threads/"
		replyToThread(user.uid, path, comment)
		setComment("");
		setShowTextField(false);
	}

	function getShowRepliesText(x) {
		if (x > 1) {
			return x + " Replies"
		}
		return "1 Reply"
	}

	let sortedThreads = [];
	const haveChild = ("threads" in props.data && Object.values(props.data.threads).length > 0);
	if (haveChild) sortedThreads = Object.entries(props.data.threads).sort().reverse();

	return (
		<Box className={classes.threadContainer} style={props.style}>
			<Comment author={props.data.author} comment={props.data.comment} time={props.data.time} />
			<Box className={classes.rowContainer}>
				{(showThreads && haveChild) &&
					<Box className={classes.collapseButton} onClick={() => setShowThreads(false)}>
						<Box className={classes.collapseLine} />
					</Box>
				}
				<Box className={classes.verticalContainer}>
					{(showThreads) ?
						<Button color="primary" onClick={() => { setShowTextField(!showTextField) }}>
							Reply
							<MessageIcon style={{ marginLeft: "10px" }} />
						</Button>
						:
						(haveChild) && <Button color="primary" onClick={() => { setShowThreads(true) }}>
							Show {getShowRepliesText(Object.values(props.data.threads).length)}
						</Button>
					}
					<Collapse in={showTextField}>
						<TextField
							placeholder="Add comments here"
							inputProps={{ 'aria-label': 'Add comments here' }}
							value={comment}
							onChange={(e) => { setComment(e.target.value) }}
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
					<Collapse in={showThreads}>
						{(haveChild) && sortedThreads.map(([id, thread], i) => {
							return <Thread style={{ marginLeft: "35px" }} postId={props.postId} key={i} data={thread} ids={[...props.ids, id]} />
						})}
					</Collapse>
				</Box>
			</Box>
		</Box>
	);
}

export default React.memo(Thread);