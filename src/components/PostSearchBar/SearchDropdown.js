import { Card, Button, IconButton, Typography, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { getProjectFromId, useData } from "utilities/firebase";

const expertises = [
  "Marketing",
  "Industrial Design",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Software Development",
  "Product Owner",
  "UI/UX Design",
  "Finance",
  "Graphic Design",
  "Project Management",
];
const currentPhases = [
  "Ethnography",
  "Market Research",
  "Brainstorming",
  "Idea Convergence",
  "Prototyping",
  "Engineering/Design",
  "Materials Selection",
  "Business Modeling",
  "Story/Presentation",
];

const getProjectList = (project) => {
  const listOfProject = Object.entries(project).map(
    ([projectId, projectObj]) => {
      return { ...projectObj, id: projectId };
    }
  );
  return listOfProject;
};



const SearchDropdown = ({
  isDropped,
  setIsDropped,
  setPhaseFilter,
  phaseFilter,
  setTeamFilter,
  teamFilter,
}) => {
  const [teams, teamsLoading] = useData("/project",getProjectList);


  return (
    <>
      {isDropped && (
        <Card
          sx={{ my: 0, py: 1 }}
          style={{
            width: "100%",
            zIndex: 10,
            height: "100%",
            textAlign: "left",
            borderTop: "1px solid rgba(0, 0, 0, 0.6)",
          }}
        >
          <IconButton
            sx={{
              position: "relative",
              right: 0,
              top: 0,
              float: "right",
            }}
            onClick={() => setIsDropped(false)}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h7" sx={{ left: 0, p: 2 }}>
            {" "}
            Search By <span style={{ fontWeight: "bold" }}>Current Phase</span>
          </Typography>
          <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap" }}>
            {currentPhases.map((phase, i) => (
              <Chip
                key={i}
                style={{
                  backgroundColor: phaseFilter.includes(phase) && "#f1b844",
                }}
                label={phase}
                sx={{ mx: 1, my: 0.5 }}
                onClick={() => {
                  phaseFilter.includes(phase)
                    ? setPhaseFilter(phaseFilter.filter((p) => p !== phase))
                    : setPhaseFilter([...phaseFilter, phase]);
                }}
              />
            ))}
          </Box>

          <Typography variant="h7" sx={{ left: 0, p: 2 }}>
            {" "}
            Search By <span style={{ fontWeight: "bold" }}>Team</span>
          </Typography>

          <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap" }}>
            {teams.map((team, i) => (
              <Chip
                key={i}
                style={{
                  backgroundColor: teamFilter.includes(team.id) && "#f1b844",
                }}
                label={team.name}
                sx={{ mx: 1, my: 0.5 }}
                onClick={() => {
                  teamFilter.includes(team.id)
                    ? setTeamFilter(teamFilter.filter((t) => t !== team.id))
                    : setTeamFilter([...teamFilter, team.id]);

                }}
              />
            ))}
          </Box> 
        </Card>
      )}
    </>
  );
};

export default SearchDropdown;
