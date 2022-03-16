import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  Card,
  CardHeader
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { RichTextEditor } from "@mantine/rte";
import { createPostInFirebase } from "utilities/posts.js";
import { useUserState, uploadPhotoToStorage } from "utilities/firebase.js";
import BackButton from "../Navigation/BackButton"

import { UserContext } from "components/Routing";

import { createNotification } from "utilities/notifications";

const useStyles = makeStyles({
  container: {
    alignItems: "left",
    justifyContent: "flex-start",
    backgroundColor: "white",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'space-between',
    // alignItems: "center"
    // padding: "0px 24px 20px 24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    padding: "0px 24px 20px 24px",
    marginTop: "13px",
    height: "100%",
    justifyContent: "space-evenly",
    "& .MuiTextField-root": { my: 1, width: "100%" },
  },
  field: {

  }
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
    "Enter post detail below. Type @ to see mentions autocomplete. When inserting links, make sure url starts with http:// or https://";

  const [description, setDescription] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [title, setTitle] = useState("")

  const user = useUserState();
  const classes = useStyles();

  const handlePostTagsChange = (event) => {
    const {
      target: { value },
    } = event;
    setPostTags(typeof value === "string" ? value.split(",") : value);
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

    setDescription("")
    setTitle("")
    navigate("/")
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

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


  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Card className={classes.container} sx={{ mb: 3 }}>
      <CardHeader
        sx={{ padding: "10px 16px" }}
        avatar={
          <BackButton />
        }
        title="Create a Post"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Box className={classes.form}>
        <TextField
          className={classes.field}
          autoComplete="off"
          inputProps={{ style: { fontSize: "14px" } }} // font size of input text
          InputLabelProps={{ style: { fontSize: "14px" } }} // font size of input label
          label='Title' value={title}
          onChange={(e) => { setTitle(e.target.value) }} />
        <FormControl sx={{ my: 1, width: "100%" }}>
          <InputLabel sx={{ fontSize: "14px" }}>Tags</InputLabel>
          <Select
            className={classes.field}
            multiple
            value={postTags}
            onChange={handlePostTagsChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            MenuProps={MenuProps}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {expertises.map((tags) => (
              <MenuItem sx={{
                fontSize: "14px",
                '&.Mui-selected': { // <-- mixing the two classes
                  backgroundColor: '#ececec'
                },
                '&.Mui-selected:hover': { // <-- mixing the two classes
                  backgroundColor: '#ececec'
                }
              }} key={tags} value={tags}>
                {tags}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="caption" align="left" sx={{ color: "gray", mt: 2 }}>
          {postDescriptionPlaceHolder}
        </Typography>
              <div data-cy="replyForm">
        <RichTextEditor
          value={description}
          onChange={setDescription}
          placeholder="Type @ to see mentions autocomplete"
          mentions={mentions}
          onImageUpload={handleImageUpload}
          style={{ width: "100%", marginTop: 2, minHeight: "300px" }}
          controls={[
            ["bold", "italic", "underline", "link", "image"],
            ["unorderedList", "orderedList"],
          ]}
          data-cy="replyForm"
        />
</div>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#808080", mr: 2 }}
            onClick={() => navigate(-1)}
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
    </Card>
  );
};

export default CreatePost;
