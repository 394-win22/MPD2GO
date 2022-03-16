import React from "react";

import {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Dialog,
  Button,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
        sx={{ mb: 2, px: 2 }}
        style={{ backgroundColor: '#98E297', borderRadius: 10 }}
        startIcon={<CheckCircleIcon />}
      >
        Clear All
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
            variant="contained"
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
