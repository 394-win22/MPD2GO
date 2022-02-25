import { Card, Button, IconButton, Typography, Chip } from "@mui/material";
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
const SearchDropdown = ({ isDropped, setIsDropped }) => {
  return (
    <>
      {isDropped && (
        <Card
          sx={{ my: 0 }}
          style={{ width: "100%", zIndex: 10, height: "100%", py: 1, textAlign:"left" }}
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
          <Typography variant="h7" sx={{left:0}}> Search By <span style={{fontWeight: 'bold'}}>Expertise</span></Typography>
          <Box alignItems="left" sx={{ display:"flex", flexWrap:"wrap"}}>
           
            {expertises.map((expertise, i) => (
              <Chip key={i} label={expertise} sx={{ mx: 1, my: 0.5 }} />
            ))}
          </Box>
        </Card>
      )}
    </>
  );
};

export default SearchDropdown;
