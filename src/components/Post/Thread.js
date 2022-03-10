import { useState, useContext, memo } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  Collapse,
  Button,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { Message as MessageIcon } from "@mui/icons-material";
import { UserContext } from "components/Routing";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import { RichTextEditor } from "@mantine/rte";

import { replyToThread } from "utilities/posts";
import { deleteData, updateData } from "../../utilities/firebase";
import { increment } from "firebase/database";
import AddComment from "./AddComment";
import DeleteThread from "./DeleteThread";
import { deleteCommentNotifications } from "utilities/notifications";
import DeleteCommentMenu from "./DeleteCommentMenu";

const useStyles = makeStyles({
  // Comment
  container: {
    display: "flex",
    marginTop: "10px",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: "15px",
    alignItems: "stretch",
    width: "100%"
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rightContainer: {
    display: "inline",
    float: "left",
    flexDirection: "column",
    marginLeft: "5px",
    marginRight: "5px",
    alignItems: "flex-start",
    height: "100%",
    minWidth: "0px",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  avatarButton: {
    width: "24px",
    height: "24px",
    display: "inline",
    float: "left",
  },
  avatar: {
    width: "24px !important",
    height: "24px !important",
    display: "inline",
    float: "left",
  },
  contentContainer: {
    marginLeft: "10px",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    minWidth: "0px",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    textAlign: "left",
    marginBottom: "4px",
    flexWrap: "wrap",
    minWidth: "0px",
  },
  time: {
    color: "#888888",
    fontSize: "13px !important",
  },
  collapseButton: {
    display: "flex",
    marginTop: "10px",
    width: "20px",
    boxSizing: "border-box",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
    },
    flexGrow: 1,
  },
  collapseLine: {
    minHeight: "100%",
    width: "3px",
    backgroundColor: "#eaeaea",
    boxSizing: "border-box",
    "&:hover": {
      cursor: "pointer",
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5px",
    marginBottom: "5px",
  },

  replyButton: {
    fontSize: "13px",
    padding: "8px 14px 8px 14px",
  },
  showReplies: {
    fontSize: "13px",
    padding: "8px 14px 8px 10px",
  },
});

const Thread = ({ postId, ids, data, style }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = useContext(UserContext).user;
  const userList = useContext(UserContext).userList;
  const postAuthor = userList.find((obj) => obj.uid === data.author);
  const [isShowTextField, setIsShowTextField] = useState(false);
  const [isShowThreads, setIsShowThreads] = useState(true);

  const replyToComment = (comment, notifications) => {
    // GENERATE A PATH TO PUSH TO IN DATABASE
    let path = `${postId}`;
    ids.forEach((id) => {
      path += "/threads/";
      path += id;
    });
    path += "/threads/";
    replyToThread(user.uid, postId, path, comment, notifications);
    setIsShowTextField(false);
  };

  const totalCommentsInThread = () => {
    let total = 1;
    const haveChild =
      "threads" in data && Object.values(data.threads).length > 0;

    if (haveChild) {
      total += totalCommentsInChildren(Object.values(data.threads));
    }
    return total;
  };

  const totalCommentsInChildren = (childrenArr) => {
    let childrenTotal = 0;
    childrenArr.forEach((child) => {
      childrenTotal++;
      const haveChild =
        "threads" in child && Object.values(child.threads).length > 0;
      if (haveChild) {
        childrenTotal += totalCommentsInChildren(Object.values(child.threads));
      }
    });
    return childrenTotal;
  };

  const deleteThread = () => {
    let path = `${postId}`;
    ids.forEach((id) => {
      path += "/threads/";
      path += id;
    });
    if (window.confirm("Are you sure you want to delete this comment? ")) {
      const totalComments = totalCommentsInThread();
      deleteCommentNotifications(path, userList, data);
      deleteData(`/posts/${path}`);
      updateData(`posts/${postId}`, {
        numComments: increment(-1 * totalComments),
      });
    }
  };

  function getShowRepliesText(x) {
    if (x > 1) {
      return x + " Replies";
    }
    return "1 Reply";
  }

  // if not showThreads, hide textbox
  let sortedThreads = [];
  const haveChild = "threads" in data && Object.values(data.threads).length > 0;
  if (haveChild) sortedThreads = Object.entries(data.threads).sort().reverse();
  return (
    <Box className={classes.container}>
      <Box className={classes.leftContainer} sx={{ ml: 1 }}>
        <IconButton
          className={classes.avatarButton}
          onClick={() => {
            navigate(`/profile/${postAuthor.uid}`);
          }}
        >
          <Avatar className={classes.avatar} src={postAuthor.photoURL} />
        </IconButton>
        {isShowThreads && haveChild ? (
          <Box
            className={classes.collapseButton}
            onClick={() => setIsShowThreads(false)}
          >
            <Box className={classes.collapseLine} />
          </Box>
        ) : (
          <Box className={classes.collapseButton} />
        )}
      </Box>
      <Box className={classes.rightContainer}>
        {/* comment */}
        <Box className={classes.contentContainer}>

          <Box className={classes.infoContainer}>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Typography variant="subtitle2">
                {postAuthor.displayName}
              </Typography>
              {data.author === user.uid && <DeleteCommentMenu delThreadFunction={deleteThread} />}
            </Box>

            <Typography className={classes.time}>
              {moment(data.time).format("MMMM Do YYYY, h:mm a")}
            </Typography>
          </Box>
          <RichTextEditor
            readOnly
            value={data.comment}
            style={{ marginLeft: -17, marginBottom: -20, border: "none", padding: "0" }}
          />
        </Box>

        {/* Box to add comment */}
        <Collapse in={isShowTextField} sx={{ width: "100%" }}>
          <AddComment
            replyToComment={replyToComment}
            setIsShowTextField={setIsShowTextField}
            postId={postId}
          />
        </Collapse>

        {/* buttons to show threads and/or view comments  */}
        <Box className={classes.buttonContainer}>
          {!isShowThreads && haveChild && (
            <Button
              className={classes.showReplies}
              onClick={() => {
                setIsShowThreads(true);
              }}
            >
              Show {getShowRepliesText(Object.values(data.threads).length)}
            </Button>
          )}

          {!isShowTextField && (
            <Button
              className={classes.replyButton}
              color="primary"
              onClick={() => {
                setIsShowTextField(!isShowTextField);
              }}
            >
              Reply
              <MessageIcon
                style={{ marginLeft: "5px", height: "16px", marginTop: "2px" }}
              />
            </Button>
          )}
        </Box>

        {/* child threads */}
        <Collapse in={isShowThreads}>
          {haveChild &&
            sortedThreads.map(([id, thread], i) => {
              return (
                <Thread
                  style={{ marginLeft: "0px", flexWrap: "wrap" }}
                  postId={postId}
                  key={i}
                  data={thread}
                  ids={[...ids, id]}
                />
              );
            })}
        </Collapse>
      </Box>
    </Box >
  );
};

export default memo(Thread);
