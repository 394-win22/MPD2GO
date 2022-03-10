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

// icons
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//local file
import { updateData } from "utilities/firebase";

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
  "Project Management",
];

const Expertise = ({ userData, uid }) => {
  const [isExpertiseEditing, setIsExpertiseEditing] = useState(false);
  const [expertise, setExpertise] = useState([]);

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setExpertise(typeof value === "string" ? value.split(",") : value);
  };

  const handleExpertiseSubmit = () => {
    updateData(`/users/${uid}`, { expertise: expertise });
    setIsExpertiseEditing(false);
  };

  if (isExpertiseEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <FormControl sx={{ width: 205 }}>
          <InputLabel id="expertise">Expertise</InputLabel>
          <Select
            labelId="expertise"
            name="Expertise"
            value={expertise}
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

        <IconButton onClick={() => setIsExpertiseEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleExpertiseSubmit}>
          <CheckIcon />
        </IconButton>
      </Stack>
    );
  }
  return (
    <>
      <Typography align="left" sx={{ ml: 2, mt: 1, color: "#7B7B7B" }}>
        <IconButton onClick={() => setIsExpertiseEditing(true)}>
          <EditIcon />
        </IconButton>
        Expertise
      </Typography>
      <Stack
        direction="row"
        sx={{ marginBottom: 1, ml: 2, overflowX: "scroll" }}
        spacing={1}
      >
        {expertise.length > 0
          ? expertise.map((data, i) => <Chip key={i} color="secondary" label={data} />)
          : "expertise" in userData &&
            Object.values(userData.expertise).map((x, i) => (
              <Chip key={i} color="secondary" label={x} />
            ))}
      </Stack>
    </>
  );
};

export default Expertise;
