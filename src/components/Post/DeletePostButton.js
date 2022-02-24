import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { deleteData } from "../../utilities/firebase";
import Button from "@mui/material/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
  },
});

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
    console.log(post)
    deleteData(`/posts/${post.id}`);
    navigate("/");
    handleClose();
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          sx={{
            mb: 2,
            mr: 1,
            color: "white",
          }}
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
      </ThemeProvider>
    </>
  );
};
