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

const Email = ({ userData, isEmailEditing, setIsEmailEditing }) => {
  if (isEmailEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <IconButton onClick={() => setIsEmailEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <TextField id="email" label="Email" defaultValue={userData.email} />
      </Stack>
    );
  }
  return (
    <Stack direction="row" sx={{ marginBottom: 3, marginTop: 2 }} spacing={1}>
      <IconButton onClick={() => setIsEmailEditing(true)} sx={{ p: 0 }}>
        <EditIcon />
      </IconButton>
      <EmailIcon sx={{ color: "#999999" }} />
      <Typography>{userData.email}</Typography>
    </Stack>
  );
};

export default Email;
