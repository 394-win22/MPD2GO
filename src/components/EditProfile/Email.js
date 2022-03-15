import { useState } from "react";
import {
  Typography,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
// icons
import { Email as EmailIcon } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//local file
import { updateData } from "utilities/firebase";

const Email = ({ userData, uid }) => {
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [email, setEmail] = useState(userData.email);

  const handleEmailSubmit = () => {
    updateData(`/users/${uid}`, { email: email });
    setIsEmailEditing(false);
  };

  if (isEmailEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <TextField
          id="email"
          label="Email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <IconButton onClick={() => setIsEmailEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleEmailSubmit}>
          <CheckIcon />
        </IconButton>
      </Stack>
    );
  }
  return (
    <Stack direction="row" sx={{ marginBottom: 3, marginTop: 2 }} spacing={1}>
      <IconButton onClick={() => setIsEmailEditing(true)} sx={{ p: 0 }}>
        <EditIcon />
      </IconButton>
      <EmailIcon sx={{ color: "#999999" }} />
      <Typography>{email}</Typography>
    </Stack>
  );
};

export default Email;
