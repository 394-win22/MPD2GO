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

const LinkedIn = ({ userData, isLinkedInEditing, setIsLinkedInEditing }) => {
  if (isLinkedInEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <IconButton onClick={() => setIsLinkedInEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <TextField
          id="linkedIn"
          label="LinkedIn"
          defaultValue={userData.linkedIn ? userData.linkedIn : "No LinkedIn"}
        />
      </Stack>
    );
  }
  return (
    <Stack direction="row" sx={{ marginBottom: 3 }} spacing={1}>
      <IconButton onClick={() => setIsLinkedInEditing(true)} sx={{ p: 0 }}>
        <EditIcon />
      </IconButton>
      <LinkedInIcon sx={{ color: "#4173ac" }} />
      <Typography>{userData.linkedIn ? userData.linkedIn : "No LinkedIn"}</Typography>
    </Stack>
  );
};

export default LinkedIn;
