import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      onClick={() => {
        navigate(-1);
      }}
      sx={{color: "inherit"}}
    >
      <ArrowBackIcon sx={{color: "#808080"}}/>
    </IconButton>
  );
};

export default BackButton;
