import { useState, useMemo, useContext } from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { RichTextEditor } from "@mantine/rte";
import { UserContext } from "components/Routing/index.js";

import { addCommentToPost } from "../../utilities/posts.js";
import { createNotification } from "utilities/notifications.js";

const topicTags = [
  { id: 1, value: "JavaScript" },
  { id: 2, value: "TypeScript" },
  { id: 3, value: "Ruby" },
  { id: 4, value: "Python" },
];

const ReplyTextField = ({ post, user }) => {
  const context = useContext(UserContext);
  const [comment, setComment] = useState("");
  const people = context.userList.map((u) => {
    return { id: u.uid, value: u.displayName };
  });

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

  const submitComment = () => {
    // check if there any mentions
    var el = document.createElement("html");
    el.innerHTML = comment;
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

    addCommentToPost(post.author, user.uid, post.id, modifiedContent);

    // add mentioned to notification
    mentionSpans &&
      Array.from(mentionSpans).forEach(function (mentionSpan) {
        if (mentionSpan.getAttribute("data-denotation-char") === "@") {
          createNotification(
            mentionSpan.getAttribute("data-id"),
            user.uid,
            post.id,
            modifiedContent,
            "mention"
          );
        }
      });

    setComment("");
  };

  return (
    <Box
      sx={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        fontSize: "12px",
        color: "#6e6e6e",
        paddingTop: "10px",
        paddingLeft: "3%",
        paddingRight: "3%",
        paddingBottom: "20px",
      }}
      borderBottom={"1px solid #e9e9e9"}
    >
      Comment as {user.displayName}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "5px",
          width: "100%",
        }}
      >
        <RichTextEditor
          controls={[
            ["bold", "italic", "underline", "link"],
            ["unorderedList", "h1", "h2", "h3"],
            ["sup", "sub"],
            ["alignLeft", "alignCenter", "alignRight"],
          ]}
          onImageUpload={() => {
            return new Promise((_, reject) => {
              reject("Image uploading not allowed.");
            });
          }}
          value={comment}
          onChange={setComment}
          placeholder="Type @ or # to see mentions autocomplete"
          mentions={mentions}
          style={{ marginTop: "12px", width: "100%" }}
          onDragStart={() => {
            return false;
          }}
          onDrop={() => {
            return false;
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              if (comment !== "<p><br></p>") submitComment();
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReplyTextField;
