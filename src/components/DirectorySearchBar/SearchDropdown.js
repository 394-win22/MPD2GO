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
  'Alumni'
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
            Search By <span style={{ fontWeight: "bold" }}>Expertise</span>
          </Typography>
          <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap" }}>
            {expertises.map((expertise, i) => {
              return (
                <Chip
                  key={i}
                  style={{
                    backgroundColor: filter.expertise.includes(expertise) && "#f1b844",
                  }}
                  label={expertise}
                  sx={{ mx: 1, my: 0.5 }}
                  onClick={() => {
                    const newExpertise = filter.expertise.filter((p) => p !== expertise)
                    filter.expertise.includes(expertise)
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
          <Typography variant="h7" sx={{ left: 0, p: 2 }}>
            {" "}
            Search By <span style={{ fontWeight: "bold" }}>Profile Type</span>
          </Typography>
          <Box alignItems="left" sx={{ display: "flex", flexWrap: "wrap" }}>
            {types.map((type, i) => {
              return (
                <Chip
                  key={i}
                  style={{
                    backgroundColor: filter.type.includes(type) && "#f1b844",
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
        </Card>
      )}
    </>
  );
};

export default SearchDropdown;
