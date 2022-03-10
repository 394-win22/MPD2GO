import { Card, IconButton, Typography, Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";

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

const types = [
  'Current Student',
  'Alumni',
  'Staff'
]

const SearchDropdown = ({
  isDropped,
  setIsDropped,
  setFilter,
  filter
}) => {
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
            <CloseIcon />
          </IconButton>
          <Box>
            <Typography variant="h7" sx={{ left: 0, p: 2, }}>
              {" "}
              Filter by <span style={{ fontWeight: "bold" }}>Expertise</span>
            </Typography>
            <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap", ml: 1, mt: 1 }}>
              {expertises.map((expertise, i) => {
                const active = filter.expertise.includes(expertise);
                return (
                  <Chip
                    key={i}
                    style={{
                      backgroundColor: active && "#f1b844",
                      color: active && "#ffffff",
                    }}
                    label={expertise}
                    sx={{ mx: 1, my: 0.5 }}
                    onClick={() => {
                      const newExpertise = filter.expertise.filter((p) => p !== expertise)
                      active
                        ? setFilter({
                          ...filter,
                          expertise: newExpertise
                        })
                        : setFilter({
                          ...filter,
                          expertise: [...filter.expertise, expertise]
                        });
                    }}
                  />
                )
              })}
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h7" sx={{ left: 0, p: 2 }}>
              {" "}
              Filter by <span style={{ fontWeight: "bold" }}>Profile Type</span>
            </Typography>
            <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap", ml: 1, mt: 1 }}>
              {types.map((type, i) => {
                const active = filter.type.includes(type);
                return (
                  <Chip
                    key={i}
                    style={{
                      backgroundColor: active && "#f1b844",
                      color: active && "#ffffff",
                    }}
                    label={type}
                    sx={{ mx: 1, my: 0.5 }}
                    onClick={() => {
                      const newType = filter.type.filter((p) => p !== type)
                      filter.type.includes(type)
                        ? setFilter({
                          ...filter,
                          type: newType
                        })
                        : setFilter({
                          ...filter,
                          type: [...filter.type, type]
                        });
                    }}
                  />
                );
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
