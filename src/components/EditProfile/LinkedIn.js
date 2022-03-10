import { useState } from "react";
import { Typography, Stack, IconButton, TextField } from "@mui/material";
// icons
import { Email as EmailIcon } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//local file
import { updateData } from "utilities/firebase";

const LinkedIn = ({ userData, uid }) => {
  const [isLinkedInEditing, setIsLinkedInEditing] = useState(false);
  const [linkedIn, setLinkedIn] = useState(userData.linkedIn);

  const handleLinkedInSubmit = () => {
    updateData(`/users/${uid}`, { linkedIn: linkedIn });
    setIsLinkedInEditing(false);
  };

  if (isLinkedInEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <TextField
          id="linkedIn"
          label="LinkedIn"
          defaultValue={linkedIn ? linkedIn : "No LinkedIn"}
          onChange={(e) => setLinkedIn(e.target.value)}
        />

        <IconButton onClick={() => setIsLinkedInEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleLinkedInSubmit}>
          <CheckIcon />
        </IconButton>
      </Stack>
    );
  }
  return (
    <Stack direction="row" sx={{ marginBottom: 3 }} spacing={1}>
      <IconButton onClick={() => setIsLinkedInEditing(true)} sx={{ p: 0 }}>
        <EditIcon />
      </IconButton>
      <LinkedInIcon sx={{ color: "#4173ac" }} />
      <Typography>{linkedIn ? linkedIn : "No LinkedIn"}</Typography>
    </Stack>
  );
};

export default LinkedIn;
