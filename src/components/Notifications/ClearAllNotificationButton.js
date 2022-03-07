import React from "react";

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
} from "@mui/material";
import { removeAtPath } from "../../utilities/firebase";

export const ClearAllNotification = ({ uid }) => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteAllNotification(uid) {
    removeAtPath(`users/${uid}/notifications`);
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
        Clear All Notifications
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Clear All Notifications</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear all notifications?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteAllNotification(uid)}
            color="primary"
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
