import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "@mui/material/IconButton";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      sx={{ mt: 1 }}
      color="inherit"
      onClick={() => {
        navigate(-1);
      }}
    >
      <KeyboardBackspaceIcon sx={{ color: "#808080" }} />
    </IconButton>
  );
};

export default BackButton;
