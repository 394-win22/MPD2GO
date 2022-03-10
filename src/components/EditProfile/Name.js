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

const Name = ({ userData, isNameEditing, setIsNameEditing }) => {
  if (isNameEditing) {
    return (
      <Stack direction="row" sx={{ my: 2 }} justifyContent="center" alignItems="center">
        <IconButton onClick={() => setIsNameEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>
        <TextField required id="name" label="Name" defaultValue={userData.displayName} />
      </Stack>
    );
  }
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{
        flexGrow: 1,
        paddingLeft: 1,
        paddingBottom: 1,
        marginBottom: "0px",
      }}
    >
      <IconButton onClick={() => setIsNameEditing(true)}>
        <EditIcon />
      </IconButton>
      {userData.displayName}
    </Typography>
  );
};

export default Name;
