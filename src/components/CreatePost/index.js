import { useState, useMemo, useContext } from "react";
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
import { RichTextEditor } from "@mantine/rte";

import { createPostInFirebase } from "utilities/posts.js";
import { useUserState, uploadPhotoToStorage } from "utilities/firebase.js";

import { UserContext } from "components/Routing";

import { createNotification } from "utilities/notifications";

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

const expertises = [
  "Marketing",
  "Industrial Design",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Software Development",
  "Product Owner",
  "UI/UX Design",
  "Finance",
  "Graphic Design",
  "Project Management",
];

const topicTags = [
  { id: 1, value: "JavaScript" },
  { id: 2, value: "TypeScript" },
  { id: 3, value: "Ruby" },
  { id: 4, value: "Python" },
];

const CreatePost = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const postDescriptionPlaceHolder =
    "<p>Enter post detail here. Type @ or # to see mentions autocomplete. When inserting links, make sure url starts with http:// or https://</p>";
  const [description, setDescription] = useState(postDescriptionPlaceHolder);
  const [postTags, setPostTags] = useState([]);

  const user = useUserState();

  const classes = useStyles();

  const handlePostTagsChange = (event) => {
    const {
      target: { value },
    } = event;
    setPostTags(typeof value === "string" ? value.split(",") : value);
  };

  const handleDescriptionClick = () => {
    if (description === postDescriptionPlaceHolder) setDescription("");
  };

  const people = context.userList.map((u) => {
    return { id: u.uid, value: u.displayName };
  });

  const handleSubmit = async () => {
    // check if there any mentions
    var el = document.createElement("html");
    el.innerHTML = description;
    var mentionSpans = el.getElementsByClassName("mention");

    // add link to mention spans
    mentionSpans &&
      Array.from(mentionSpans).forEach(function (mentionSpan) {
        if (mentionSpan.getAttribute("data-denotation-char") === "@") {
          var mentionWithLink = document.createElement("p");
          const uid = mentionSpan.getAttribute("data-id");
          mentionWithLink.innerHTML = `<a href="/profile/${uid}" rel="noopener noreferrer" target="_self">  ${mentionSpan.outerHTML}  </a>`;
          mentionSpan.outerHTML = mentionWithLink.innerHTML;
        }
      });

    const modifiedContent = el.querySelector("body").innerHTML;

  const postId = createPostInFirebase({
    tags: postTags,
    description: modifiedContent,
    time: Date.now(),
    author: user.uid,
    numComments: 0,
    associatedNotificationIds: []
  });

    let notificationIds = [];
    // add mentioned to notification
    mentionSpans &&
      Array.from(mentionSpans).forEach(function (mentionSpan) {
        if (mentionSpan.getAttribute("data-denotation-char") === "@") {
          createNotification(
            mentionSpan.getAttribute("data-id"),
            user.uid,
            postId,
            modifiedContent,
            "mention"
          );
        }
      });

    setDescription("");
    navigate("/");
  };

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@", "#"],
      source: (searchTerm, renderList, mentionChar) => {
        const list = mentionChar === "@" ? people : topicTags;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // limit the items in list to 5
        renderList(includesSearchTerm.slice(0, 5));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleImageUpload = (file) => uploadPhotoToStorage(file);

  return (
    <Box className={classes.container}>
      <Typography align="center" variant="h4" sx={{ mb: 3 }}>
        Create Post
      </Typography>
      <Box className={classes.form}>

        <FormControl sx={{ mt: 1, width: "100%" }}>
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
            {expertises.map((tags) => (
              <MenuItem key={tags} value={tags}>
                {tags}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <RichTextEditor
          value={description}
          onClick={handleDescriptionClick}
          onChange={setDescription}
          placeholder="Type @ or # to see mentions autocomplete"
          mentions={mentions}
          onImageUpload={handleImageUpload}
          style={{ width: "100%", marginTop: "16px" }}
          controls={[
            ["bold", "italic", "underline", "link", "image"],
            ["unorderedList","orderedList"],
          ]}
        />

        <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#808080" }}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              if (description !== "<p><br></p>") handleSubmit();
            }}
          >
            Post
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default CreatePost;
