import { Box, Typography, TextField, Button} from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

});

const CreatePost = ({}) => {
	const classes = useStyles();
  return (
    <Box >
			<Typography>Create Post</Typography>
			<Box className={classes.container}>
				<TextField id="outlined-basic"
				label="Title"
				variant="outlined" />
				<TextField
						id="outlined-multiline-flexible"
						label="Text (optional)"
						multiline
						maxRows={4}
						// value={value}
						// onChange={handleChange}
					/>

					<Button variant="contained">Cancel</Button>
					<Button variant="contained">Post</Button>
				</Box>


    </Box>
  );
};

export default CreatePost;