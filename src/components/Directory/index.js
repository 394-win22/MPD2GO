import { useState, useEffect, useContext } from "react";
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
	Divider

} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link'
import moment from "moment";
import Chip from "@mui/material/Chip";
import { UserContext } from "components/Routing";
import DirectoryIcon from '@mui/icons-material/Directory';
import CommentNotification from "./CommentNotification";
import MentionNotification from "./MentionNotification";

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
				<CardHeader sx={{ padding: "10px 16px" }} avatar={<Avatar sx={{ backgroundColor: "white", color: "#bbbbbb" }}><DirectoryIcon /></Avatar>}
					title="Directory" titleTypographyProps={{ sx: { fontSize: "16px" } }} />

			</Card>
		</>
	);
};

export default Directory;
