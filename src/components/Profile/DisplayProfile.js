import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Typography,
  Avatar,
  Box,
  Divider,
  Button,
  Stack,
  Card,
  Chip,
  IconButton,
  CardHeader,
} from "@mui/material";
import { getUserStatus } from "../../utilities/firebase";
// icons
import { Email as EmailIcon } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

// local files
import { getProjectFromUid, getUserFromUid } from "../../utilities/firebase";
import { signOut } from "utilities/firebase";
import BackButton from "../Navigation/BackButton";
import { CardActions } from "@material-ui/core";

const DisplayProfile = ({ userData, user, setIsEditProfile, projectData }) => {
  const params = useParams();
  const navigate = useNavigate();

  const handleProfileSubmit = () => {
    setIsEditProfile(false);
  };

  return (
    <>
      <CardHeader
        sx={{ p: 0 }}
        avatar={<BackButton />}
        action={
          (!params.userID || params.userID === user.uid) && (
            <IconButton onClick={() => setIsEditProfile(true)}>
              <EditIcon />
            </IconButton>
          )
        }
      ></CardHeader>

      <Box textAlign="center">
        <Avatar
          alt={userData.displayName}
          src={userData.photoURL}
          variant="circular"
          sx={{
            height: "20vh",
            width: "20vh",
            margin: "auto",
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
          component="div"
          sx={{ flexGrow: 1, paddingLeft: 1, color: "#7B7B7B" }}
        >
          {userData.bio ? userData.bio : "No Bio"}
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
          style={{ color: "#7B7B7B" }}
          sx={{ paddingLeft: 1, my: 1 }}
        >
          {getUserStatus(userData)}
        </Typography>

        <Typography
          variant="body1"
          display="block"
          style={{ color: "#7B7B7B" }}
          sx={{ flexGrow: 1, paddingLeft: 1 }}
        >
          {userData.year ? "Class of " + userData.year : "No Year"}
        </Typography>

        {"teamId" in userData ? (
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/project/${userData.teamId}`);
            }}
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: projectData.teamColor,
              color: projectData.textColor,
              textBlendMode: "exclusion",
            }}
          >
            View {projectData.name}
          </Button>
        ) : (
          <Typography
            variant="body1"
            style={{ color: "#7B7B7B" }}
            sx={{ paddingLeft: 1, my: 1 }}
          >
            No team
          </Typography>
        )}

        <Divider />

        <Typography align="left" sx={{ marginBottom: 1, ml: 2, mt: 1, color: "#7B7B7B" }}>
          Expertise
        </Typography>
        <Stack
          direction="row"
          sx={{ marginBottom: 1, ml: 2, overflowX: "scroll" }}
          spacing={1}
        >
          {"expertise" in userData &&
            Object.values(userData.expertise).map((x, i) => (
              <Chip key={i} color="secondary" label={x} />
            ))}
        </Stack>

        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Stack direction="row" sx={{ marginBottom: 3, marginTop: 2 }} spacing={1}>
              <EmailIcon sx={{ color: "#999999" }} />
              <Typography>{userData.email}</Typography>
            </Stack>
            <Stack direction="row" sx={{ marginBottom: 3 }} spacing={1}>
              <LinkedInIcon sx={{ color: "#4173ac" }} />
              <Typography>
                {userData.linkedIn ? userData.linkedIn : "No LinkedIn"}
              </Typography>
            </Stack>
          </Box>
        </Box>
        {(!params.userID || params.userID === user.uid) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ width: "150px", marginTop: "10px" }}
              variant="contained"
              onClick={signOut}
              id="logout_btn"
            >
              Sign out{" "}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DisplayProfile;
