import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { createPostInFirebase } from "utilities/posts.js";
import { useUserState } from "utilities/firebase.js";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "40px 24px 40px 24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    "& .MuiTextField-root": { my: 1, width: "100%" },
  },
});

const postTagNames = [
  "postTag1",
  "postTag2",
  "postTag3",
  "postTag4",
];

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postTags, setPostTags] = useState([]);

  const user = useUserState();

  const classes = useStyles();

  const handlePostTagsChange = (event) => {
    const {
      target: { value },
    } = event;
    setPostTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (e) => {
    createPostInFirebase({
      title: title,
      tags: postTags,
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
    <Box className={classes.container}>
      <Typography align="center" variant="h4" sx={{ mb: 3 }}>
        Create Post
      </Typography>
      <Box className={classes.form}>
        <TextField
          margin="normal"
          label="Title"
          value={title}
          variant="outlined"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          autoComplete="off"
        />

        <FormControl sx={{  mt:1, width: "100%" }}>
          <InputLabel>Tags</InputLabel>
          <Select
            multiple
            value={postTags}
            onChange={handlePostTagsChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {postTagNames.map((tags) => (
              <MenuItem key={tags} value={tags}>
                {tags}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          margin="normal"
          label="Text (optional)"
          multiline
          minRows={4}
          value={description}
          autoComplete="off"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#808080" }}
            onClick={() => navigate(-1)}
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
