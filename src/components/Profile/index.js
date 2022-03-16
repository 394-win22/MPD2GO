import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card } from "@mui/material";
// icons

// local files
import { getProjectFromUid, getUserFromUid } from "../../utilities/firebase";
import DisplayProfile from "./DisplayProfile";
import EditProfile from "components/EditProfile";

const Profile = ({ user }) => {
  const params = useParams();
  const [userData, setUserData] = useState(null);
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

  if (!userData || !projectData)
    return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;

  if (userData === "not found")
    return <h1 style={{ marginLeft: 20 }}>User Not Found</h1>;

  return (
    <Card
      sx={{ px: 2, py: 2, mb: 2, minHeight: "77vh" }}
      style={{ borderRadius: 10 }}
    >
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
  );
};

export default Profile;

// <Card sx={{ px: 2, py: 2, mb: 2, minHeight: "77vh" }} style={{ borderRadius: 10 }}>

//   <BackButton />
//   <Box textAlign="center">
//     <Avatar
//       alt={userData.displayName}
//       src={userData.photoURL}
//       variant="circular"
//       sx={{
//         height: "80px",
//         width: "80px",
//         margin: "auto",
//         mb: 3,
//       }}
//     />
//     <Typography
//       variant="h5"
//       component="div"
//       sx={{
//         flexGrow: 1,
//         paddingLeft: 1,
//         paddingBottom: 1,
//         marginBottom: "0px",
//       }}
//     >
//       {userData.displayName}
//     </Typography>

//     <Typography
//       component="div"
//       cy-data="bio"
//       sx={{ flexGrow: 1, paddingLeft: 1, color: "#7B7B7B" }}
//     >
//       {userData.bio ? userData.bio : "No Bio"}
//     </Typography>

//     <Typography
//       variant="body1"
//       display="block"
//       cy-data="location"
//       sx={{ my: 1 }}
//       style={{ color: "#7B7B7B" }}
//     >
//       {userData.location ? userData.location : "Unknown Location"}
//     </Typography>
//     <Divider />
//     <Typography
//       variant="body1"
//       style={{ color: "#7B7B7B" }}
//       sx={{ paddingLeft: 1, my: 1 }}
//     >
//       {getUserStatus(userData)}
//     </Typography>

//     <Typography
//       variant="body1"
//       display="block"
//       cy-data="class"
//       style={{ color: "#7B7B7B" }}
//       sx={{ flexGrow: 1, paddingLeft: 1 }}
//     >
//       {userData.year ? "Class of " + userData.year : "No Year"}
//     </Typography>

//     {"teamId" in userData && (
//       <Button
//         variant="contained"
//         onClick={() => {
//           navigate(`/project/${userData.teamId}`);
//         }}
//         sx={{
//           mt: 1,
//           mb: 2,
//           backgroundColor: projectData.teamColor,
//           color: projectData.textColor,
//           textBlendMode: "exclusion",
//         }}
//         cy-data="teamButton"
//       >
//         View {projectData.name}
//       </Button>
//     )}

//     <Divider />

//     <Typography
//       align="left"
//       sx={{ marginBottom: 3, ml: 2, mt: 1, color: "#7B7B7B" }}
//     >
//       Expertise
//     </Typography>
//     <Stack
//       direction="row"
//       sx={{ marginBottom: 3, ml: 2, overflowX: "scroll" }}
//       spacing={1}
//     >
//       {"expertise" in userData &&
//         Object.values(userData.expertise).map((x, i) => (
//           <Chip key={i} color="secondary" label={x} />
//         ))}
//     </Stack>
