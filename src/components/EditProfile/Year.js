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

const Year = ({ userData, isYearEditing, setIsYearEditing }) => {
  if (isYearEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 1 }}>
        <IconButton onClick={() => setIsYearEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>
        <TextField
          id="year"
          label="Year"
          defaultValue={userData.year ? "Class of " + userData.year : "No Year"}
        />
      </Stack>
    );
  }
  return (
    <Typography
      variant="body1"
      display="block"
      style={{ color: "#7B7B7B" }}
      sx={{ flexGrow: 1, paddingLeft: 1 }}
    >
      <IconButton onClick={() => setIsYearEditing(true)}>
        <EditIcon />
      </IconButton>
      {userData.year ? "Class of " + userData.year : "No Year"}
    </Typography>
  );
};

export default Year;
