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

const Location = ({ userData, isLocationEditing, setIsLocationEditing }) => {
  if (isLocationEditing) {
    return (
      <Stack direction="row" sx={{ my: 2 }} justifyContent="center" alignItems="center">
        <IconButton onClick={() => setIsLocationEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>
        <TextField
          id="location"
          label="Location"
          defaultValue={userData.location ? userData.location : "Unknown Location"}
        />
      </Stack>
    );
  }
  return (
    <Typography
      variant="body1"
      display="block"
      sx={{ my: 1 }}
      style={{ color: "#7B7B7B" }}
    >
      <IconButton onClick={() => setIsLocationEditing(true)}>
        <EditIcon />
      </IconButton>
      {userData.location ? userData.location : "Unknown Location"}
    </Typography>
  );
};

export default Location;
