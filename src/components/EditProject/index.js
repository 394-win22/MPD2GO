import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, Stack, Label } from "@mui/material";
import { makeStyles } from "@mui/styles";
/* For "Create" Button in Modal Box */
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { setData, deleteData, pushData } from "../../utilities/firebase";
import { editProjectInFirebase } from "utilities/projects";
import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DriveLogo from "google-drive.png";
import MuralLogo from "mural.png";
import LinkIcon from "@mui/icons-material/Link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getProjectFromUid } from "../../utilities/firebase";
import { ColorButton } from "mui-color";
import {textColor} from "../../utilities/posts"

async function fetchData(projectId, setProjectData) {
  const data = await getProjectFromUid(projectId);
  if (!data) setProjectData("not found");
  else setProjectData(data);
}

const removeResource = (projectId, resource, rname, setProjectData) => {
  return () => {
    deleteData(`/project/${projectId}/resources/${rname}`);
    fetchData(projectId, setProjectData);
  };
};

const addResource = (projectId, text, url, setProjectData) => {
  pushData(`/project/${projectId}/resources/`, { text: text, url: url });
  fetchData(projectId, setProjectData);
};

const RenderRow = (projectId, resources, rnames, setProjectData) => {
  return ({ index, style }) => {
    let resource = resources[index];
    let rname = rnames[index];
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <Button
          sx={{ marginLeft: "8px" }}
          startIcon={
            resource.url.includes("mural") ? (
              <img src={MuralLogo} alt="" style={{ height: 20, width: 20 }} />
            ) : resource.url.includes("drive") ? (
              <img
                src={DriveLogo}
                alt=""
                style={{ height: "20px", width: "20px" }}
              />
            ) : (
              <LinkIcon />
            )
          }
          onClick={() => {
            window.open(resource.url);
          }}
        >
          {resource.text}
        </Button>
        <Button
          style={{ alignSelf: "right" }}
          onClick={removeResource(projectId, resource, rname, setProjectData)}
        >
          <RemoveCircleIcon />
        </Button>
      </ListItem>
    );
  };
};

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

const EditProject = ({
  project,
  projectId,
  open,
  handleClose,
  setProjectData,
}) => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState(project);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [newResourceText, setNewResourceText] = useState("");
  const [newResourceURL, setNewResourceURL] = useState("");
  const handleNewResourceText = (e) => {
    setNewResourceText(e.target.value);
  };

  const handleNewResourceURL = (e) => {
    setNewResourceURL(e.target.value);
  };

  const newResource = () => {
    addResource(projectId, newResourceText, newResourceURL, setProjectData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formValues.textColor = textColor(formValues.teamColor);
    //projectId = "projectID";
    editProjectInFirebase(projectId, formValues);
    // re-render
    setProjectData(formValues);
    handleClose();
  };

  const resources = project.resources ? Object.values(project.resources) : [];
  const rnames = project.resources ? Object.keys(project.resources) : [];

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
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            label="Team Name"
            type="text"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            label="description"
            type="text"
            multiline
            minRows={4}
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
            <TextField
            name="teamColor"
            value={formValues.teamColor}
            onChange={handleInputChange}
            label="team color"
            type="color"
            InputLabelProps={{ shrink: true }}
          />
          <Box
            sx={{ bgcolor: 'background.paper', borderColor: 'grey' }}
          >
          
          {resources.length > 0 &&
          <>
            <Typography alignSelf="left" justifySelf="left" align="left" textAlign="left">
              Resources (Scroll to See All)
            </Typography>
            <FixedSizeList
              height={100}
              width={360}
              itemSize={46}
              itemCount={resources.length}
              overscanCount={5}> 
              {RenderRow(projectId, resources, rnames, setProjectData)}
            </FixedSizeList>
          </>}
          <Typography>Add Resource</Typography>
          <Stack direction="row">
            <TextField
              name="addResourceText"
              label="Resource Text"
              type="text"
              minRows = {4}
              InputLabelProps={{ shrink: true }}
              style={{width: "40%"}}
              onChange={handleNewResourceText}
            />
            <TextField
              name="addResourceURL"
              label="Resource URL"
              type="text"
              minRows = {4}
              InputLabelProps={{ shrink: true }}
              style={{width: "40%"}}
              onChange={handleNewResourceURL}
            />
            <Button onClick={newResource}>
              <AddCircleIcon/>
            </Button>
          </Stack>
          </Box>
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
