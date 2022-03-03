import React from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";

import { deleteData } from "../../utilities/firebase";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: red[500],
    },
  },
});

export const EditPostButton = ({ post, isEdit, setIsEdit }) => {

  return (
    <>
      <ThemeProvider theme={theme}>
        {isEdit ? (
          <>
            <Button
              onClick={() => setIsEdit(false)}
              variant="contained"
              color="secondary"
              sx={{
                mb: 2,
                color: "white",
                mr: 1,
              }}
            >
              Cancel Edit
            </Button>
            
          </>
        ) : (
          <Button
            onClick={() => setIsEdit(true)}
            variant="contained"
            color="secondary"
            sx={{
              mb: 2,
              color: "white",
              mr: 1,
            }}
          >
            Edit Post
          </Button>
        )}
      </ThemeProvider>
    </>
  );
};
