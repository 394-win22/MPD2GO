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

const Expertise = ({
  userData,
  isExpertiseEditing,
  setIsExpertiseEditing,
  formValues,
}) => {
  const [expertise, setExpertise] = useState("");

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setExpertise(typeof value === "string" ? value.split(",") : value);
  };

  if (isExpertiseEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <IconButton onClick={() => setIsExpertiseEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>
        <FormControl sx={{ width: 205 }}>
          <InputLabel id="expertise">Expertise</InputLabel>
          <Select
            labelId="expertise"
            name="Expertise"
            value={expertise || formValues.expertise || []}
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
      </Stack>
    );
  }
  return (
    <>
      <Typography align="left" sx={{ marginBottom: 3, ml: 2, mt: 1, color: "#7B7B7B" }}>
        <IconButton onClick={() => setIsExpertiseEditing(true)}>
          <EditIcon />
        </IconButton>
        Expertise
      </Typography>
      <Stack
        direction="row"
        sx={{ marginBottom: 3, ml: 2, overflowX: "scroll" }}
        spacing={1}
      >
        {"expertise" in userData &&
          Object.values(userData.expertise).map((x, i) => (
            <Chip key={i} color="secondary" label={x} />
          ))}
      </Stack>
    </>
  );
};

export default Expertise;
