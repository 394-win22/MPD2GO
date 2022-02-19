import { Stack, Box, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { createPostInFirebase } from "utilities/posts.js";
import { useUserState } from "utilities/firebase.js";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});

const CreatePost = () => {
  const user = useUserState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const classes = useStyles();
  const handleSubmit = async (e) => {
    console.log(title, description);
    createPostInFirebase({
      title: title,
      description: description,
      time: Date.now(),
      author: user.uid,
      numComments: 0,
    });
    setTitle("");
    setDescription("");
    navigate("/");
  };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
      sx={{ px: 3, py: 5 }}>
      <Typography align="center" variant="h4" sx={{ mb: 3 }}>
        Create Post
      </Typography>
      <Box
        sx={{ "& .MuiTextField-root": { my: 1, width: "100%" } }}
        className={classes.container}
      >
        <TextField
          margin="normal"
          label="Title"
          value={title}
          variant="outlined"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          margin="normal"
          label="Text (optional)"
          multiline
          minRows={4}
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#808080" }}
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Post
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreatePost;
