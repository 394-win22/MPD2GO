import { useState, useContext, useMemo } from "react";
import { Box, Button } from "@mui/material";
import { RichTextEditor } from "@mantine/rte";
import { useUserState } from "utilities/firebase.js";
import { UserContext } from 'components/LoggedIn'
import { createNotification } from "utilities/notifications";

const topicTags = [
  { id: 1, value: "JavaScript" },
  { id: 2, value: "TypeScript" },
  { id: 3, value: "Ruby" },
  { id: 4, value: "Python" },
];

const AddComment = ({ replyToComment, setIsShowTextField, postId }) => {
  const [comment, setComment] = useState("");
  const context = useContext(UserContext);
  const user = useUserState();
  const people = context.userList.map((u) => {
    return { id: u.uid, value: u.displayName };
  });

  const handleSubmit = async (e) => {
		replyToComment(comment)

    // add mentioned to notification
    var el = document.createElement("html");
    el.innerHTML = comment;
    var mentionSpans = el.getElementsByClassName("mention");

		// Creating the notification
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
        }
      });

    setComment("");
		setIsShowTextField(false);
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}>

      <RichTextEditor
				controls={[
					['bold', 'italic', 'underline', 'link'],
					['unorderedList', 'h1', 'h2', 'h3'],
					['sup', 'sub'],
					['alignLeft', 'alignCenter', 'alignRight'],
				]}
				onImageUpload={() => {return new Promise((_, reject) => {reject('Image uploading not allowed.')})}}
        value={comment}
        onChange={setComment}
        placeholder="Type @ or # to see mentions autocomplete"
        mentions={mentions}
        style={{ marginTop: "12px", width: "100%" }}
				onDragStart={() => {return false}}
				onDrop={() => {return false}}
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
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AddComment;
