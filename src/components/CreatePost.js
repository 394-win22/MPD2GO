import { Stack, Box, Typography, TextField, Button} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {useState} from "react";
import {createPostInFirebase} from '../utilities/posts.js';
import { useUserState } from "../utilities/firebase.js";
import { useNavigate } from "react-router-dom";
import TopNavBar from "./TopNavBar"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
	padding: 2
  },

});


const CreatePost = () => {
  const user = useUserState();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const navigate = useNavigate();

	const classes = useStyles();
	const handleSubmit = async (e)=>{
		console.log(title , description)
		createPostInFirebase({
			title: title,
			description: description,
			time: Date.now(),
			author: user.uid
		});
		setTitle("");
		setDescription("");
		navigate("/")
  };


  return (

    <Box >
			<Typography align="center" variant="h4" sx={{padding: 2}}>Create Post</Typography>
			<Box sx={{'& .MuiTextField-root': { m: 1, width: 300 },}} className={classes.container}>
				<TextField
				label="Title"
				value = {title}
				variant="outlined"
				onChange ={(event)=> {setTitle(event.target.value)}}
				/>
				<TextField
						label="Text (optional)"
						multiline
						minRows={4}
						value={description}
						onChange= {(event)=> {setDescription(event.target.value)}}
					/>
					<Stack spacing={2} direction="row" padding={2}>
						<Button variant="contained" style={{backgroundColor: "#808080"}} onClick={() => navigate("/")}>Cancel</Button>
						<Button variant="contained" type="submit" onClick={handleSubmit} >Post</Button>
					</Stack>
			</Box>
			<TopNavBar isLoggedIn={user ? true : false} />
    </Box>
	
  );
};

export default CreatePost;