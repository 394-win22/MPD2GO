import { useState } from "react";
import { Typography, Stack, IconButton, TextField } from "@mui/material";
// icons
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//local file
import { updateData } from "utilities/firebase";

const Year = ({ userData, uid }) => {
  const [isYearEditing, setIsYearEditing] = useState(false);
  const [year, setYear] = useState(userData.year);

  const handleYearSubmit = () => {
    updateData(`/users/${uid}`, { year: year });
    setIsYearEditing(false);
  };

  if (isYearEditing) {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{ my: 1 }}>
        <TextField
          type="number"
          id="year"
          label="Year"
          defaultValue={year ? year : ""}
          onChange={(e) => setYear(e.target.value)}
        />
        <IconButton onClick={() => setIsYearEditing(false)}>
          <CancelOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleYearSubmit}>
          <CheckIcon />
        </IconButton>
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
      {year ? "Class of " + year : "No Year"}
    </Typography>
  );
};

export default Year;
