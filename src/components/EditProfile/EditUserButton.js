import React from "react";
import Button from "@mui/material/Button";
import EditUserModal from "../EditProfile";

export const EditUserButton = ({ user,userID }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        <Button
          onClick={handleClickOpen}
          variant="contained"
        >
          Edit Profile
        </Button>
        <EditUserModal
          user={user}
          userID={userID}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
        />
    </>
  );
};