import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Typography, Stack, IconButton, TextField } from "@mui/material";
// icons
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//local file
import { updateData } from "utilities/firebase";

const Name = ({ userData, uid }) => {
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [name, setName] = useState(userData.displayName);

  const handleNameSubmit = () => {
    updateData(`/users/${uid}`, { displayName: name });
    setIsNameEditing(false);
  };

  if (isNameEditing) {
    return (
      <Stack direction="row" sx={{ my: 2 }} justifyContent="center" alignItems="center">
        <TextField
          required
          id="name"
          label="Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <IconButton onClick={() => setIsNameEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleNameSubmit}>
          <CheckIcon />
        </IconButton>
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
      {name}
    </Typography>
  );
};

export default Name;
