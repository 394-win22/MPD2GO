import {
  Typography,
  Box,
  Divider,
  IconButton,
  CardHeader,
} from "@mui/material";
import { getUserStatus, useData } from "../../utilities/firebase";
// icons
import CheckIcon from "@mui/icons-material/Check";

// local files
import BackButton from "../Navigation/BackButton";
import UserAvatar from "./UserAvatar";
import Name from "./Name";
import Bio from "./Bio";
import Location from "./Location";
import Year from "./Year";
import Team from "./Team";
import Expertise from "./Expertise";
import Email from "./Email";
import LinkedIn from "./LinkedIn";

export const getProjectList = (project) => {
  const listOfProject = Object.entries(project).map(
    ([projectId, projectObj]) => {
      return { ...projectObj, id: projectId };
    }
  );
  return listOfProject;
};

const EditProfile = ({ userData, user, setIsEditProfile, projectData }) => {
  const [, projectListLoading] = useData("/project", getProjectList);

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
          <IconButton onClick={handleProfileSubmit} cy-data="submitEdition">
            <CheckIcon />
          </IconButton>
        }
      ></CardHeader>

      <Box
        component="form"
        sx={{ justifyContent: "center", textAlign: "center" }}
        noValidate
      >
        <UserAvatar userData={userData} uid={user.uid} />
        <Name userData={userData} uid={user.uid} />
        <Bio userData={userData} uid={user.uid} />
        <Location userData={userData} uid={user.uid} />

        <Divider />
        <Typography
          variant="body1"
          style={{ color: "#7B7B7B" }}
          sx={{ paddingLeft: 1, my: 2 }}
        >
          {getUserStatus(userData)}
        </Typography>

        <Year userData={userData} uid={user.uid} />
        <Team userData={userData} projectData={projectData} uid={user.uid} />

        <Divider />

        <Expertise userData={userData} uid={user.uid} />

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
            <Email userData={userData} uid={user.uid} />

            <LinkedIn userData={userData} uid={user.uid} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditProfile;
