import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	Typography,
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	List,
	Avatar,
	Box,
	Button,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Divider

} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link'
import moment from "moment";
import Chip from "@mui/material/Chip";
import { UserContext } from "components/Routing";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const getStatus = (userData) => {
	if (!("year" in userData) || userData.year == "") {
	  return "Unknown Status";
	}
	if (userData.year < new Date().getFullYear()) {
	  return "Alumni";
	}
	else {
	  return "Current Student";
	}
}

const Directory = () => {
	const navigate = useNavigate();
	const context = useContext(UserContext);
	const users = context.userList;
	const userData = users.find((x) => x.uid === context.user.uid);
	const hasDirectory = "Directory" in userData && Object.values(userData.Directory).length > 0;


	useEffect(() => {

	}, []);


	return (
		<>
			<Button
				sx={{ ml: 1, mb: 2, color: 'white' }}
				variant='contained'
				onClick={() => {
					navigate(-1);
				}}
			>
				Back
			</Button>
			<Card sx={{ mx: 1, mb: 10 }} style={{ borderRadius: 10 }}>
				<CardHeader sx={{ padding: "10px 16px" }} avatar={<Avatar sx={{ backgroundColor: "white", color: "#bbbbbb" }}><PeopleAltIcon /></Avatar>}
					title="Directory" titleTypographyProps={{ sx: { fontSize: "16px" } }} />

			
			<List>
				{users.map(user => (
					<ListItem alignItems="flex-start">
						<ListItemAvatar>
						<Avatar alt={user.displayName} src={user.photoURL} />
						</ListItemAvatar>
						<ListItemText
						primary={user.displayName}
						secondary={
							<React.Fragment>
							<Typography
								sx={{ display: 'inline' }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Ali Connors
							</Typography>
							{getStatus(user)}
							</React.Fragment>
						}
						/>
					</ListItem>
				))}
			</List>
			</Card>
		</>
	);
};

export default Directory;
