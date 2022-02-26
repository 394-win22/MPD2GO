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

import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  OutlinedInput,
  Input,
} from "@mui/material/";

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

const expertiseList = [
  "Marketing",
  "Industrial Design",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Software Development",
  "Product Owner",
  "UI/UX Design",
  "Finance",
  "Graphic Design",
  "Project Management"
];

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
  const [expertise, setExpertise] = useState("");
  let changeImg = false;

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
    if (!changeImg) {
      formValues.photoURL = user.photoURL;
    } else {
      const photoURL = await uploadPhotoToStorage(image);
      formValues.photoURL = photoURL;
    }
    formValues.expertise = expertise;
    const oldTeamId = user.teamId;
    const newTeamId = formValues.teamId;
    if (oldTeamId !== newTeamId) {
      addToProject(userID, getProjectFromId(newTeamId, projectList));
      if (oldTeamId) {
        removeFromProject(userID, getProjectFromId(oldTeamId, projectList));
      }
    }
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
      changeImg = true;
      // if there is no file, set image back to null
    } else {
      setImage(null);
    }
  };

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setExpertise(typeof value === "string" ? value.split(",") : value);
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
        <form className={classes.form}>
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
            type="number"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="team">Team</InputLabel>
            <Select
              labelId="team"
              name="teamId"
              value={formValues.teamId || ""}
              label="team"
              onChange={handleInputChange}
            >
              {projectList.map((project) => {
                return (
                  <MenuItem key={project.id} value={project.id}>
                    {project.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <label htmlFor="Avatar-File">
            <Input
              accept="image/*"
              id="Avatar-File"
              type="file"
              onChange={(e) => {
                onImageChange(e);
              }}
              style={{display: "none"}}
            />
            <Button variant="contained" component="span" sx={{ m: 1, width: "25ch" }}>
              Upload Avatar File
            </Button>
          </label>
          <FormControl sx={{ m: 1, width: "25ch" }}>
            <InputLabel id="expertise">Expertise</InputLabel>
            <Select
              labelId="expertise"
              name="Expertise"
              value={expertise || formValues.expertise || []}
              label="expertise"
              onChange={handleTagChange}
              multiple
              renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            >
              {expertiseList.map((expert) => (
                <MenuItem key={expert} value={expert}>
                  {expert}
                </MenuItem>
              ))}
            </Select>
          </FormControl>


          <TextField
            name="bio"
            multiline
            minRows={4}
            value={formValues.bio}
            onChange={handleInputChange}
            label="bio"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="linkedIn"
            value={formValues.linkedIn}
            onChange={handleInputChange}
            label="linkedIn"
            type="url"
            InputLabelProps={{ shrink: true }}
          />
        </form>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
          type="submit"
        >
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
