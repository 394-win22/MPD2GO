import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const BackButton = () => {
    
    const navigate = useNavigate();
    return(
    <KeyboardBackspaceIcon
          sx={{ ml: 2, mt: 1, color: "#808080"}}
          onClick={() => {
            navigate(-1);
          }}
        />
    );
};

export default BackButton;

