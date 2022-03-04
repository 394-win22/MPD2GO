import { useState } from "react";
import Button from "@mui/material/Button";
import EditProject from "/";

const EditProjectButton = ({ project, projectId, setProjectData }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ margin: 1 }}
        style={{ float: "right" }}
        onClick={handleClickOpen}
      >
        Edit Project
      </Button>
      <EditProject
        project={project}
        projectId={projectId}
        open={open}
        handleClose={handleClose}
        setProjectData={setProjectData}
      />
    </>
  );
};

export default EditProjectButton;
