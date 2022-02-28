import { useState, useContext, useMemo } from "react";
import { Box, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { RichTextEditor } from "@mantine/rte";
import { useUserState, uploadPhotoToStorage } from "utilities/firebase.js";
import { UserContext } from 'components/LoggedIn'
import { createNotification } from "utilities/notifications";

const useStyles = makeStyles({
  textField: {
    marginTop: "10px",
    marginLeft: "10px",
    width: "100%",
  },
});

const postTagNames = [
  "Ethnography",
  "Market Research",
  "Brainstorming",
  "Idea Convergence",
  "Prototyping",
  "Engineering/Design",
  "Materials Selection",
  "Business Modeling",
  "Story/Presentation",
];

const topicTags = [
  { id: 1, value: "JavaScript" },
  { id: 2, value: "TypeScript" },
  { id: 3, value: "Ruby" },
  { id: 4, value: "Python" },
];

const AddComment = ({ replyToComment, setIsShowTextField, postId }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const [postTags, setPostTags] = useState([]);
  const context = useContext(UserContext);
  const user = useUserState();
  const people = context.userList.map((u) => {
    return { id: u.uid, value: u.displayName };
  });

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
    
    // add mentioned to notification
    var el = document.createElement("html");
    el.innerHTML = comment;
    var mentionSpans = el.getElementsByClassName("mention");

    mentionSpans &&
      Array.from(mentionSpans).forEach(function (mentionSpan) {
        if (mentionSpan.getAttribute("data-denotation-char") === "@") {
          createNotification(
            mentionSpan.getAttribute("data-id"),
            user.uid,
            postId,
            "click to check the post",
            "mention"
          );
          console.log("postId", postId);
        }
      });

    setComment("");
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
    []
  );

  const handleImageUpload = (file) => uploadPhotoToStorage(file);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}>
      {/* <TextField
        placeholder="Add comments here"
        inputProps={{
          "aria-label": "Add comments here",
          style: { fontSize: "14px" },
        }}
        className={classes.textField}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        variant="outlined"
        multiline
        minRows={1}
        maxRows={3}
        autoComplete="off"
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            replyToComment(comment);
            setIsShowTextField(false);
            setComment("");
          }
          // add mentioned to notification
          var el = document.createElement("html");
          el.innerHTML = description;
          var mentionSpans = el.getElementsByClassName("mention");

          mentionSpans &&
            Array.from(mentionSpans).forEach(function (mentionSpan) {
              if (mentionSpan.getAttribute("data-denotation-char") === "@") {
                createNotification(
                  mentionSpan.getAttribute("data-id"),
                  user.uid,
                  postId,
                  "click to check the post",
                  "mention"
                );
                console.log("postId", postId);
              }
            });
        }}
      /> */}

      <RichTextEditor
        value={comment}
        onChange={setComment}
        placeholder="Type @ or # to see mentions autocomplete"
        mentions={mentions}
        onImageUpload={handleImageUpload}
        style={{ marginTop: "12px", width: "100%" }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={() => {
            setIsShowTextField(false);
            setComment("");
          }}
        >
          Cancel
        </Button>
        {/* <Button
          variant="contained"
          sx={{}}
          onClick={() => {
            replyToComment(comment);
            setIsShowTextField(false);
            setComment("");
          }}
        >
          Send
        </Button> */}
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AddComment;
