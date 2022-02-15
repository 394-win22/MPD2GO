import { Stack, Box, Typography, TextField, Button} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {useState} from "react";


const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

});


const CreatePost = ({}) => {
	
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const classes = useStyles();
	const handleSubmit = async (e)=>{
		console.log(title , description)
		//createPostInFirebase();
   	};
  return (
	
    <Box >
			<Typography>Create Post</Typography>
			<Box sx={{'& .MuiTextField-root': { m: 1, width: '50ch' },}} className={classes.container}>
				<TextField id="outlined-basic"
				label="Title"
				value = {title}
				variant="outlined"
				onChange ={(value)=> {setTitle(value)}} />
				<TextField
						id="outlined-multiline-flexible"
						label="Text (optional)"
						multiline
						minRows={4}
						value={description}
						onChange= {(value)=> {setDescription(value)}}
					/>
					<Stack spacing={2} direction="row">
						<Button variant="contained">Cancel</Button>
						<Button variant="contained" type="submit" onClick={handleSubmit} >Post</Button>
					</Stack>
			</Box>


    </Box>
  );
};

export default CreatePost;