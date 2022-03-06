import React from "react";
import { useNavigate } from "react-router-dom";

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
} from "@mui/material";
import { deleteData } from "../../utilities/firebase";
import { deleteCommentNotifications, markNotificationAsRead } from "utilities/notifications";

function deletePostNotifications(postId, userList)  {
  userList.map((user)=> {
    if (user.notifications) {
      Object.keys(user.notifications).map(async (key) => {
        const notif = user.notifications[key];
        //console.log("NOTIF:", notif);
        if (notif.postId === postId) {
          console.log("NOTIF MATCH:",notif);
          console.log(user.uid, notif.postId);
          await markNotificationAsRead(user.uid, key);
        }
      });
    }
  });
}

export const DeletePostButton = ({ post, userList }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deletePost(post) {
    if (post.threads) {
      Object.keys(post.threads).map((key)=>{
        const data = post.threads[key];
        deleteCommentNotifications(`/posts/${post.id}/threads/${key}`, userList, data);
      });
    }
    deletePostNotifications(post.id, userList);
    deleteData(`/posts/${post.id}`);
    navigate("/");
    handleClose();
  }

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="error"
        sx={{ mb: 2 }}
      >
        Delete Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => deletePost(post)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
