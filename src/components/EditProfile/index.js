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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { getUserStatus, useData } from "../../utilities/firebase";
// icons
import { Email as EmailIcon } from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

// local files
import { getProjectFromUid, getUserFromUid } from "../../utilities/firebase";
import { signOut } from "utilities/firebase";
import BackButton from "../Navigation/BackButton";
import Name from "./Name";
import Bio from "./Bio";
import Location from "./Location";
import Year from "./Year";
import Team from "./Team";
import Expertise from "./Expertise";
import Email from "./Email";
import LinkedIn from "./LinkedIn";

export const getProjectList = (project) => {
  const listOfProject = Object.entries(project).map(([projectId, projectObj]) => {
    return { ...projectObj, id: projectId };
  });
  return listOfProject;
};

const EditProfile = ({ userData, user, setIsEditProfile, projectData }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isBioEditing, setIsBioEditing] = useState(false);
  const [isLocationEditing, setIsLocationEditing] = useState(false);
  const [isYearEditing, setIsYearEditing] = useState(false);
  const [isTeamEditing, setIsTeamEditing] = useState(false);
  const [isExpertiseEditing, setIsExpertiseEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isLinkedInEditing, setIsLinkedInEditing] = useState(false);

  const [formValues, setFormValues] = useState(user);
  const [projectList, projectListLoading] = useData("/project", getProjectList);

  if (projectListLoading) {
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;
  }

  const handleProfileSubmit = () => {
    setIsEditProfile(false);
  };

  return (
    <>
      <CardHeader
        sx={{ p: 0 }}
        avatar={<BackButton />}
        action={
          <IconButton onClick={handleProfileSubmit}>
            <CheckIcon />
          </IconButton>
        }
      ></CardHeader>

      <Box
        component="form"
        sx={{ justifyContent: "center", textAlign: "center" }}
        noValidate
      >
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
        <Name
          userData={userData}
          isNameEditing={isNameEditing}
          setIsNameEditing={setIsNameEditing}
        />
        <Bio
          userData={userData}
          isBioEditing={isBioEditing}
          setIsBioEditing={setIsBioEditing}
        />

        <Location
          userData={userData}
          isLocationEditing={isLocationEditing}
          setIsLocationEditing={setIsLocationEditing}
        />

        <Divider />
        <Typography
          variant="body1"
          style={{ color: "#7B7B7B" }}
          sx={{ paddingLeft: 1, my: 2 }}
        >
          {getUserStatus(userData)}
        </Typography>

        <Year
          userData={userData}
          isYearEditing={isYearEditing}
          setIsYearEditing={setIsYearEditing}
        />
        <Team
          userData={userData}
          isTeamEditing={isTeamEditing}
          setIsTeamEditing={setIsTeamEditing}
          formValues={formValues}
          projectData={projectData}
        />

        <Divider />

        <Expertise
          userData={userData}
          isExpertiseEditing={isExpertiseEditing}
          setIsExpertiseEditing={setIsExpertiseEditing}
          formValues={formValues}
        />

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
            <Email
              userData={userData}
              isEmailEditing={isEmailEditing}
              setIsEmailEditing={setIsEmailEditing}
            />

            <LinkedIn
              userData={userData}
              isLinkedInEditing={isLinkedInEditing}
              setIsLinkedInEditing={setIsLinkedInEditing}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
