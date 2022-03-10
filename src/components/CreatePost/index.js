import { useState, useMemo, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
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
    alignItems: "left",
    justifyContent: "center",
    backgroundColor: "white",
    padding: "40px 24px 40px 24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
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

const CreatePost = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const postDescriptionPlaceHolder =
    "Enter post detail below. Type @ or # to see mentions autocomplete. When inserting links, make sure url starts with http:// or https://";

  const [description, setDescription] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [title, setTitle] = useState("");

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
      title: title,
      tags: postTags,
      description: modifiedContent,
      time: Date.now(),
      author: user.uid,
      numComments: 0,
      associatedNotificationIds: [],
    });

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
    setTitle("");
    navigate("/");
  };

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      source: (searchTerm, renderList, mentionChar) => {
        const list = people;
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
    <Box className={classes.container} style={{ borderRadius: 10 }} data-cy="createPostBox">
      <Typography align="center" variant="h6" sx={{ mb: 1 }}>
        Create a Post
      </Typography>

      <Box className={classes.form}>
        <FormControl sx={{ my: 1, width: "100%" }}>
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
        <TextField
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <Typography
          variant="caption"
          align="left"
          sx={{ color: "gray", mt: 2 }}
        >
          {postDescriptionPlaceHolder}
        </Typography>

        <RichTextEditor
          value={description}
          onClick={handleDescriptionClick}
          onChange={setDescription}
          placeholder="Type @ to see mentions autocomplete"
          mentions={mentions}
          onImageUpload={handleImageUpload}
          style={{ width: "100%", marginTop: 2, height: "300px" }}
          controls={[
            ["bold", "italic", "underline", "link", "image"],
            ["unorderedList", "orderedList"],
          ]}
        />

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#808080", mr: 2 }}
            onClick={() => navigate()}
            data-cy="cancelCreatePostBtn"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              if (description !== "<p><br></p>") handleSubmit();
            }}
            data-cy="submitPostBtn"
          >
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreatePost;
