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
import { editProjectInFirebase } from "utilities/projects";

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

const EditProject = ({ project, projectId, open, handleClose, setProjectData }) => {
  const classes = useStyles()

  const [formValues, setFormValues] = useState(project)

  const handleInputChange = (e) => {
    console.log(e.target.value);
    const name = e.target.name
    const value = e.target.value

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //projectId = "projectID";
    editProjectInFirebase(projectId, formValues);   
    // re-render 
    setProjectData(formValues);
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
            Edit Your Project Page
          </Typography>
          <TextField
            required
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            label="description"
            type="text"
            multiline
            minRows = {4}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            name="slideURL"
            value={formValues.slideURL}
            onChange={handleInputChange}
            label="Google Slides Link"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="phase"
            value={formValues.phase}
            onChange={handleInputChange}
            label="Project Phase"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
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
export default EditProject;
