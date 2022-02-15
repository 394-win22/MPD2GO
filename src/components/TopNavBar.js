import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";



const TopNavBar = ({ isLoggedIn, setQuery }) => {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 3 }}>
      <AppBar position="static" style={{ background: "#465a82" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            align="left"
            sx={{ flexGrow: 1, paddingLeft: 1 }}
          >
            MPD2Go
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNavBar;
