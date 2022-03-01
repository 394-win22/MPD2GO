import { useState, useContext, memo } from "react";
import { useNavigate } from "react-router";
import { Box, Collapse, Button } from "@mui/material";
import { Message as MessageIcon } from "@mui/icons-material";
import { UserContext } from "components/Routing";
import { makeStyles } from "@mui/styles";
import { Avatar, Typography, IconButton } from "@mui/material";
import moment from "moment";
import { RichTextEditor } from "@mantine/rte";

import { deleteData } from "../../utilities/firebase";
import { replyToThread } from "utilities/posts";
import AddComment from "./AddComment";

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
  },
  leftContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rightContainer: {
    display: "inline",
    float: 'left',
    flexDirection: "column",
    marginLeft: '5px',
    alignItems: "flex-start",
    height: "100%",
    minWidth: "0px",
    flexWrap: "wrap",
  },
  avatarButton: {
    width: "24px",
    height: "24px",
    display: 'inline',
    float: 'left'
  },
  avatar: {
    width: "24px",
    height: "24px",
    display: 'inline',
    float: 'left',
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
    fontSize: "13px",
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
    marginBottom: "5px",
  },

  replyButton: {
    fontSize: "13px",
    padding: "8px 14px 8px 14px",
  },
  deleteButton: {
    color: "red",
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

  const replyToComment = (comment) => {
    // GENERATE A PATH TO PUSH TO IN DATABASE
    let path = `${postId}`;
    ids.forEach((id) => {
      path += "/threads/";
      path += id;
    });
    path += "/threads/";
    replyToThread(user.uid, postId, path, comment);
    setIsShowTextField(false);
  };

  const deleteThread = () => {
    let path = `${postId}`;
    ids.forEach((id) => {
      path += "/threads/";
      path += id;
    });
    if (window.confirm("Are you sure you want to delete this comment")) {
      deleteData(`/posts/${path}`);
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
      <Box className={classes.leftContainer}>
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
            <Typography variant="subtitle2">
              {postAuthor.displayName}
            </Typography>
            <Typography className={classes.time}>
              {moment(data.time).format("MMMM Do YYYY, h:mm a")}
            </Typography>
          </Box>
          <RichTextEditor readOnly value={data.comment} style={{marginLeft: -17, marginBottom: -20, border: 'none'}}/>
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
              color="primary"
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
          {data.author == user.uid && !isShowTextField && (
            <Button
              className={classes.deleteButton}
              color="primary"
              onClick={() => {
                deleteThread();
              }}
            >
              Delete
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
    </Box>
  );
};

export default memo(Thread);
