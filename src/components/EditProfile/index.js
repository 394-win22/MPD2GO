import { useState } from "react";
import { makeStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import {
  setData,
  useData,
  addToProject,
  removeFromProject,
  getProjectFromId,
  uploadPhotoToStorage,
} from "../../utilities/firebase";

import {Box, Typography, Modal, TextField, Button, InputLabel, MenuItem, FormControl, Select} from "@mui/material/";

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
  },
  title: {
    textAlign: "center",
  },
  form: {
    height: "100%",
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
  const [image, setImage] = useState(null);

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
    // formValues.photoURL = user.photoURL;
    const oldTeamId = user.teamId;
    const newTeamId = formValues.teamId;
    if (oldTeamId != newTeamId) {
      addToProject(userID, getProjectFromId(newTeamId, projectList));
      removeFromProject(userID, getProjectFromId(oldTeamId, projectList));
    }
    const photoURL = await uploadPhotoToStorage(image);
    formValues.photoURL = photoURL;
    editUserInFirebase(user, userID, formValues);
    handleClose();
  };

  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      setFormValues({
        ...formValues,
        photoURL: file.name,
      });
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      // if there is no file, set image back to null
    } else {
      setImage(null);
    }
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
                return <MenuItem value={project.id}>{project.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <Box sx={{ padding: 1 }}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                onImageChange(e);
              }}
            />
          </Box>
          <TextField
            name="bio"
            multiline
            minRows={4}
            value={formValues.bio}
            onChange={handleInputChange}
            label="bio"
            type="text"
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
