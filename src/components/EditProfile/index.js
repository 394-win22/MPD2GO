import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
/* For "Create" Button in Modal Box */
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { setData } from "../../utilities/firebase";

const useStyles = makeStyles({
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "10px",
    borderRadius: "10px",
    overflow: "auto",
    height: "80%",
    overflowY: "scroll",
  },
  title: {
    textAlign: "center",
  },
  form: {
    height: "100%",
    overflowY: "scroll",
  },
});
function editUserInFirebase(user, userID, formValues) {
  setData("users/" + userID, formValues);
}

const EditUserModal = ({ user, userID, open, handleClose }) => {
  const classes = useStyles()

  const [formValues, setFormValues] = useState(user)

  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formValues.photoURL = user.photoURL;
    editUserInFirebase(user, userID, formValues);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ "& .MuiTextField-root": { m: 2, width: "25ch" } }}
    >
      <Box className={classes.container}>
        <form
          onSubmit={handleSubmit}
          style={{ textAlign: "center" }}
          className={classes.form}
        >
          <Typography
            variant="h5"
            component="h5"
            align="center"
            className={classes.title}
          >
            Edit Your Profile
          </Typography>
          <TextField
            required
            name="Name"
            value={formValues.displayName}
            onChange={handleInputChange}
            label="name"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            label="Email Address"
            type="email"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="bio"
            value={formValues.bio}
            onChange={handleInputChange}
            label="bio"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="year"
            value={formValues.year}
            onChange={handleInputChange}
            label="year"
            type="number"
            InputLabelProps={{ shrink: true }}
          />{" "}
          <Button variant="contained" endIcon={<SendIcon />} type="submit">
            Edit
          </Button>
          <Button type="button" onClick={() => handleClose()}>
            {" "}
            Cancel{" "}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
export default EditUserModal;
