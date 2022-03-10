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

const Bio = ({ userData, isBioEditing, setIsBioEditing }) => {
  if (isBioEditing) {
    return (
      <Stack direction="row" sx={{ my: 2 }} justifyContent="center" alignItems="center">
        <IconButton onClick={() => setIsBioEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>
        <TextField
          id="bio"
          label="bio"
          defaultValue={userData.bio ? userData.bio : "No Bio"}
        />
      </Stack>
    );
  }
  return (
    <Typography component="div" sx={{ flexGrow: 1, paddingLeft: 1, color: "#7B7B7B" }}>
      <IconButton onClick={() => setIsBioEditing(true)}>
        <EditIcon />
      </IconButton>
      {userData.bio ? userData.bio : "No Bio"}
    </Typography>
  );
};

export default Bio;
