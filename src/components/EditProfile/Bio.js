import { useState } from "react";
import { Typography, Stack, IconButton, TextField } from "@mui/material";
// icons
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckIcon from "@mui/icons-material/Check";

//local file
import { updateData } from "utilities/firebase";

const Bio = ({ userData, uid }) => {
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [bio, setBio] = useState(userData.bio);

  const handleBioSubmit = () => {
    updateData(`/users/${uid}`, { bio: bio });
    setIsBioEditing(false);
  };

  if (isBioEditing) {
    return (
      <Stack direction="row" sx={{ my: 2 }} justifyContent="center" alignItems="center">
        <TextField
          id="bio"
          label="bio"
          defaultValue={bio ? bio : "No Bio"}
          onChange={(e) => setBio(e.target.value)}
        />
        <IconButton onClick={() => setIsBioEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleBioSubmit}>
          <CheckIcon />
        </IconButton>
      </Stack>
    );
  }
  return (
    <Typography component="div" sx={{ flexGrow: 1, paddingLeft: 1, color: "#7B7B7B" }}>
      <IconButton onClick={() => setIsBioEditing(true)}>
        <EditIcon />
      </IconButton>
      {bio ? bio : "No Bio"}
    </Typography>
  );
};

export default Bio;
