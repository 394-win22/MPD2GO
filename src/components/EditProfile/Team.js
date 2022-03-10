import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Typography,
  Avatar,
  Box,
  Divider,
  Button,
  Stack,
  Card,
  Chip,
  IconButton,
  CardHeader,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getUserStatus, useData } from "../../utilities/firebase";
// icons
import { Email as EmailIcon } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

export const getProjectList = (project) => {
  const listOfProject = Object.entries(project).map(([projectId, projectObj]) => {
    return { ...projectObj, id: projectId };
  });
  return listOfProject;
};

const Team = ({ userData, isTeamEditing, setIsTeamEditing, formValues, projectData }) => {
  const navigate = useNavigate();
  const [projectList, projectListLoading] = useData("/project", getProjectList);

  if (projectListLoading) {
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;
  }
  if (isTeamEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <IconButton onClick={() => setIsTeamEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <FormControl sx={{ width: 205 }}>
          <InputLabel id="team">Team</InputLabel>
          <Select
            labelId="team"
            name="teamId"
            value={formValues.teamId || ""}
            label="team"
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
      </Stack>
    );
  }
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <IconButton onClick={() => setIsTeamEditing(true)}>
        <EditIcon />
      </IconButton>
      {"teamId" in userData ? (
        <Button
          variant="contained"
          onClick={() => {
            navigate(`/project/${userData.teamId}`);
          }}
          sx={{
            mt: 1,
            mb: 2,
            backgroundColor: projectData.teamColor,
            color: projectData.textColor,
            textBlendMode: "exclusion",
          }}
        >
          View {projectData.name}
        </Button>
      ) : (
        <Typography
          variant="body1"
          style={{ color: "#7B7B7B" }}
          sx={{ paddingLeft: 1, my: 1 }}
        >
          No team
        </Typography>
      )}
    </Stack>
  );
};

export default Team;
