import { Stack, Box, Typography, TextField, Button} from "@mui/material";
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
			<Box sx={{'& .MuiTextField-root': { m: 1, width: '50ch' },}} className={classes.container}>
				<TextField id="outlined-basic"
				label="Title"
				variant="outlined" />
				<TextField
						id="outlined-multiline-flexible"
						label="Text (optional)"
						multiline
						minRows={4}
						// value={value}
						// onChange={handleChange}
					/>
					<Stack spacing={2} direction="row">
						<Button variant="contained">Cancel</Button>
						<Button variant="contained">Post</Button>
					</Stack>
				</Box>


    </Box>
  );
};

export default CreatePost;