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

export const DeletePostButton = ({ post }) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deletePost(post) {
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
