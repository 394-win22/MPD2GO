import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
/* For "Create" Button in Modal Box */
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import {
  setData,
  useData,
  addToProject,
  removeFromProject,
  getProjectFromId,
} from "../../utilities/firebase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles({
  container: {
    padding: "24px 10px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10px",
    overflow: "auto",
  },
  title: {
    textAlign: "center",
  },
  form: {
    textAlign: "center",
  },
});

function editUserInFirebase(user, userID, formValues) {
  setData("users/" + userID, formValues);
}

const getProjectList = (project) => {
  const listOfProject = Object.entries(project).map(
    ([projectId, projectObj]) => {
      return { ...projectObj, id: projectId };
    }
  );
  return listOfProject;
};

const EditUserModal = ({ user, userID, open, handleClose }) => {
  const classes = useStyles();
  const [projectList, projectListLoading] = useData("/project", getProjectList);
  const [formValues, setFormValues] = useState(user);

  if (projectListLoading) {
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;
  }

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    formValues.photoURL = user.photoURL;
    const oldTeamId = user.teamId;
    const newTeamId = formValues.teamId;
    if (oldTeamId != newTeamId) {
      addToProject(userID, getProjectFromId(newTeamId, projectList));
      removeFromProject(userID, getProjectFromId(oldTeamId, projectList));
    }
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
            name="displayName"
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
            name="location"
            value={formValues.location}
            onChange={handleInputChange}
            label="location"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="year"
            value={formValues.year}
            onChange={handleInputChange}
            label="year"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="Status">Status</InputLabel>
            <Select
              labelId="status"
              name="status"
              value={formValues.status}
              label="status"
              onChange={handleInputChange}
            >
              <MenuItem value={"Current Student"}>Current Student</MenuItem>
              <MenuItem value={"Alumni"}>Alumni</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="team">Team</InputLabel>
            <Select
              labelId="team"
              name="teamId"
              value={formValues.teamId}
              label="team"
              onChange={handleInputChange}
            >
              {projectList.map((project) => {
                return <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            name="bio"
            value={formValues.bio}
            onChange={handleInputChange}
            label="bio"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
        </form>
        <Button variant="contained" endIcon={<SendIcon />} type="submit">
          Edit
        </Button>
        <Button type="button" onClick={() => handleClose()}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};
export default EditUserModal;
