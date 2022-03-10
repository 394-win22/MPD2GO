import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Typography,
  Button,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
// icons
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//local file
import { updateData, useData } from "utilities/firebase";

export const getProjectList = (project) => {
  const listOfProject = Object.entries(project).map(([projectId, projectObj]) => {
    return { ...projectObj, id: projectId };
  });
  return listOfProject;
};

const Team = ({ userData, projectData, uid }) => {
  const navigate = useNavigate();
  const [isTeamEditing, setIsTeamEditing] = useState(false);
  const [projectList, projectListLoading] = useData("/project", getProjectList);
  const [teamId, setTeamId] = useState(userData.teamId);

  const handleTeamSubmit = () => {
    updateData(`/users/${uid}`, { teamId: teamId });
    setIsTeamEditing(false);
  };

  if (projectListLoading) {
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;
  }
  if (isTeamEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <FormControl sx={{ width: 205 }}>
          <InputLabel id="team">Team</InputLabel>
          <Select
            labelId="team"
            name="teamId"
            value={teamId}
            label="team"
            onChange={(e) => setTeamId(e.target.value)}
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

        <IconButton onClick={() => setIsTeamEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleTeamSubmit}>
          <CheckIcon />
        </IconButton>
      </Stack>
    );
  }
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <IconButton onClick={() => setIsTeamEditing(true)}>
        <EditIcon />
      </IconButton>
      {teamId ? (
        <Button
          variant="contained"
          onClick={() => {
            navigate(`/project/${teamId}`);
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
