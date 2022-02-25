import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	ListItem,
	Typography,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Box,
	Button,
	ListItemButton,
	Divider
} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link'
import moment from "moment";
import Chip from "@mui/material/Chip";
import { UserContext } from "components/LoggedIn";

const CommentNotification = ({ notifObj }) => {
	const navigate = useNavigate();
	const context = useContext(UserContext);
	const users = context.userList;

	const authorData = users.find((x) => x.uid === notifObj.authorUid);
	console.log(notifObj)

	const title = `${authorData.displayName} commented on your post`;

	return (
		<>
			<ListItem component={ListItemButton} onClick={() => navigate(notifObj.postId)} alignItems="flex-start" sx={{ height: "100%", width: "100%", padding: "15px" }}>
				<ListItemAvatar>
					<Avatar src={authorData.photoURL} />
				</ListItemAvatar>
				<ListItemText sx={{ margin: "0px" }} primary={title}
					secondary={
						<React.Fragment>
							<Typography
								sx={{ display: 'inline-block' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								"{notifObj.comment}"
							</Typography>
							<Typography
								sx={{ display: 'inline-block' }}
								component="span"
								variant="body3"
								color="text.secondary"
							>{moment(notifObj.time).format("MMMM Do YYYY, h:mm a")}
							</Typography>
						</React.Fragment>
					} />
			</ListItem >
			<Divider component="li" />
		</>

	);
};

export default CommentNotification;
