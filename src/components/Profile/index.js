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
import DisplayProfile from "./DisplayProfile";
import EditProfile from "components/EditProfile";

const Profile = ({ user }) => {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);

  const [isEditProfile, setIsEditProfile] = useState(false);

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

  const handleProfileSubmit = () => {
    setIsEditProfile(false);
  };

  if (!userData || !projectData)
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;

  if (userData === "not found")
    return <h1 style={{ marginLeft: 20 }}>User Not Found</h1>;

  return (
    <>
      <Card sx={{ px: 2, py: 2, mb: 10 }} style={{ borderRadius: 10 }}>
        <BackButton />
        {isEditProfile ? (
          <EditProfile
            userData={userData}
            user={user}
            setIsEditProfile={setIsEditProfile}
            projectData={projectData}
          />
        ) : (
          <DisplayProfile
            userData={userData}
            user={user}
            setIsEditProfile={setIsEditProfile}
            projectData={projectData}
          />
        )}
      </Card>
    </>
  );
};

export default Profile;
