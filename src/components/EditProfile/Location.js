import { useState } from "react";
import { Typography, Stack, IconButton, TextField } from "@mui/material";
// icons
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//local file
import { updateData } from "utilities/firebase";

const Location = ({ userData, uid }) => {
  const [isLocationEditing, setIsLocationEditing] = useState(false);
  const [location, setLocation] = useState(userData.location);

  const handleLocationSubmit = () => {
    updateData(`/users/${uid}`, { location: location });
    setIsLocationEditing(false);
  };

  if (isLocationEditing) {
    return (
      <Stack direction="row" sx={{ my: 2 }} justifyContent="center" alignItems="center">
        <TextField
          id="location"
          label="Location"
          defaultValue={location ? location : "Unknown Location"}
          onChange={(e) => setLocation(e.target.value)}
        />

        <IconButton onClick={() => setIsLocationEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleLocationSubmit}>
          <CheckIcon />
        </IconButton>
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
      {location ? location : "Unknown Location"}
    </Typography>
  );
};

export default Location;
