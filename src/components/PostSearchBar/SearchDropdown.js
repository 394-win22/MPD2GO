import { Card, IconButton, Typography, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { useData } from "utilities/firebase";

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
  const [teams] = useData("/project", getProjectList);

  return (
    <>
      {isDropped && (
        <Card
          sx={{ my: 0, py: 1.5 }}
          style={{
            width: "100%",
            zIndex: 10,
            height: "100%",
            textAlign: "left",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
            position: "relative"
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              right: 2,
              top: 0,
              float: "right",
            }}
            onClick={() => setIsDropped(false)}
          >
            <CloseIcon sx={{ width: "24px", height: "24px" }} />
          </IconButton>
          <Box>
            <Typography variant="h7" sx={{ left: 0, p: 2 }}>
              {" "}
              Search by <span style={{ fontWeight: "bold" }}>Expertise</span>
            </Typography>
            <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap", ml: 1, mt: 1 }}>
              {expertises.map((phase, i) => (
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
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h7" sx={{ left: 0, p: 2, marginTop: "20px !important" }}>
              {" "}
              Search by <span style={{ fontWeight: "bold" }}>Team</span>
            </Typography>
            <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap", ml: 1, mt: 1 }}>
              {teams.map((team, i) => {
                console.log(team)
                const teamActive = teamFilter.includes(team.id);
                return (

                  < Chip
                    key={i}
                    style={{
                      backgroundColor: teamActive && team.teamColor,
                      color: teamActive && team.textColor
                    }
                    }
                    label={team.name}
                    sx={{ mx: 1, my: 0.5 }}
                    onClick={() => {
                      teamActive
                        ? setTeamFilter(teamFilter.filter((t) => t !== team.id))
                        : setTeamFilter([...teamFilter, team.id]);
                    }}
                  />
                )
              })}
            </Box>
          </Box>
        </Card>
      )
      }
    </>
  );
};

export default SearchDropdown;
