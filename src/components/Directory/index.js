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
	Divider,
	ListItemButton

} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link'
import moment from "moment";
import Chip from "@mui/material/Chip";
import { UserContext } from "components/Routing";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DirectorySearchBar from 'components/DirectorySearchBar';

const getStatus = (userData) => {
	if (!("year" in userData) || userData.year == "") {
		return "";
	}
	if (userData.year < new Date().getFullYear()) {
		return `Alumni`;
	}
	else {
		return `Current Student`;
	}
}

const Directory = () => {
	const navigate = useNavigate();
	const context = useContext(UserContext);
	const users = context.userList;

	const [expertiseFilter, setExpertiseFilter] = useState([]);

	const [filteredUsers, setFilteredUsers] = useState(users);



	useEffect(() => {
		if (expertiseFilter.length > 0) {
			setFilteredUsers(users.filter((user) => user.expertise.some((x) => expertiseFilter.includes(x))));
		}

	}, [expertiseFilter, users]);

	// const isYear = (("year" in userData) && userData.year !== "")
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
			<DirectorySearchBar
				expertiseFilter={expertiseFilter}
				setExpertiseFilter={setExpertiseFilter} />
			<Card sx={{ mx: 1, mb: 10 }} style={{ borderRadius: 10 }}>
				<CardHeader sx={{ padding: "10px 16px" }} avatar={<Avatar sx={{ backgroundColor: "white", color: "#bbbbbb" }}><PeopleAltIcon /></Avatar>}
					title="Directory" titleTypographyProps={{ sx: { fontSize: "16px" } }} />


				<List>
					{filteredUsers.map(user => (
						<ListItem component={ListItemButton} onClick={() => navigate(`/profile/${user.uid}`)} key={user.uid}>
							<ListItemAvatar>
								<Avatar alt={user.displayName} src={user.photoURL} />
							</ListItemAvatar>
							{(("year" in user) && user.year !== "") ?
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
												{getStatus(user)}
											</Typography>
											{` - Class of ${user.year}`}
										</React.Fragment>
									}
								/>
								:
								<ListItemText
									primary={user.displayName}
								/>
							}
						</ListItem>
					))}

				</List>
			</Card>
		</>
	);
};

export default Directory;
