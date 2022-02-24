import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Typography,
  Avatar,
  Box,
  Paper,
  Divider,
  Button,
  Stack,
  Card,
} from "@mui/material";
import { EditUserButton } from "../EditProfile/EditUserButton";
import { getUserFromUid } from "utilities/firebase";
import {
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  MoreHoriz as MoreHorizIcon,
  AddCircle as AddCircleIcon,
} from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import { getProjectFromUid } from "../../utilities/firebase";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

import LinkedInIcon from '@mui/icons-material/LinkedIn';

const getStatus = (userData) => {
  if (!("year" in userData) || userData.year == "") {
    return "Unknown Status";
  }
  if (userData.year < new Date().getFullYear()) {
    return "Alumni";
  }
  else {
    return "Current Student";
  }
}

const Profile = ({ user }) => {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);


  useEffect(() => {
    const userToSearch = params.userID || user.uid;

    getUserFromUid(userToSearch).then((data) => {
      if (!data) setUserData("not found");
      else {
        setUserData(data);
        if (data.teamId) {
          getProjectFromUid(data.teamId).then((dataProject) => {
            if (!dataProject) setProjectData("not found");
            else {
              setProjectData(dataProject);
            }
          });
        } else setProjectData("not found");
      }
    });
  }, [params, user]);

  if (!userData || !projectData)
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;

  if (userData === "not found")
    return <h1 style={{ marginLeft: 20 }}>User Not Found</h1>;

  return (
    <>
      <Button
        sx={{ ml: 1, mb: 2, color: "white" }}
        variant="contained"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
      <Card sx={{ px: 4, py: 4, mb: 10 }} style={{ borderRadius: 10 }}>
        <Box textAlign="center">
          <Avatar
            alt={userData.displayName}
            src={userData.photoURL}
            variant="rounded"
            sx={{
              height: 1 / 6,
              width: 1 / 6,
              margin: "auto",
              borderRadius: "50%",
              my: 1,
            }}
          />
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
            {userData.displayName}
          </Typography>
          <Typography
            variant="body1"
            display="block"
            sx={{ my: 1 }}
            style={{ color: "#7B7B7B" }}
          >
            {userData.location ? userData.location : "Unknown Location"}
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            display="block"
            style={{ color: "#7B7B7B" }}
            sx={{ flexGrow: 1, paddingLeft: 1, my: 1 }}
          >
            {userData.year ? "Class of " + userData.year : "No Year"}
          </Typography>
          <Typography
            variant="body1"
            display="block"
            style={{ color: "#7B7B7B" }}
            sx={{ flexGrow: 1, paddingLeft: 1, my: 1 }}
          >
            {getStatus(userData)}
            {"teamId" in userData && (
              <Chip
                size="small"
                label={projectData.name}
                variant="outlined"
                sx={{ mx: 1 }}
              />
            )}
          </Typography>
          {"teamId" in userData && (
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/project/${userData.teamId}`);
              }}
              sx={{ m: 1 }}
            >
              <InsertDriveFileIcon />
              View Capstone Page
            </Button>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: 5 }}
          >
            {userData.bio ? userData.bio : "No Bio"}

            <Divider />
          </Typography>
          <Typography align="left" sx={{ marginBottom: 3 }}>
            Expertise
          </Typography>
          <Stack direction="row" sx={{ marginBottom: 3 }}>

            {"expertise" in userData && Object.values(userData.expertise).map((x) => (
              <Button
                style={{
                  borderRadius: 15,
                  backgroundColor: "#B6B6B6",
                  padding: "3px 6px",
                  fontSize: "10px",
                }}
                variant="contained"
              >
                {x}
              </Button>
            ))}
          </Stack>
          <Divider />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
              <Stack direction="row" sx={{ marginBottom: 3, marginTop: 2 }} spacing={1}>
                <EmailIcon sx={{ color: "#999999" }} />
                <Typography>{userData.email}</Typography>
              </Stack>
              <Stack direction="row" sx={{ marginBottom: 3 }} spacing={1}>
                <LinkedInIcon sx={{ color: "#4173ac" }} />
                <Typography>{(userData.linkedIn) ? userData.linkedIn : "No LinkedIn"}</Typography>
              </Stack>
            </Box>
          </Box>
          {(!params.userID || params.userID === user.uid) && (
            <EditUserButton key={userData} user={userData} userID={user.uid} />
          )}
        </Box>
      </Card>
    </>
  );
};

export default Profile;
