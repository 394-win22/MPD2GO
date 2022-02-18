import { useEffect, useState } from "react";
import { Typography, Avatar, Box, Button } from "@mui/material";
import { useParams } from "react-router";
import { getUserFromUid } from "utilities/firebase";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const userToSearch = params.userID || user.uid;

    getUserFromUid(userToSearch).then((data) => {
      if (!data) setUserData("not found");
      else setUserData(data);
    });
  }, [params]);

  if (!userData) return <h1 style={{ marginLeft: 20 }}>Loading...</h1>;

  if (userData === "not found")
    return <h1 style={{ marginLeft: 20 }}>User Not Found</h1>;

  return (
    <Box textAlign="center">
      <Typography
        variant="h3"
        component="div"
        sx={{ flexGrow: 1, paddingLeft: 1, paddingBottom: 5 }}
      >
        {userData.displayName}
      </Typography>
      <Avatar
        alt={userData.displayName}
        src={userData.photoURL}
        variant="rounded"
        sx={{
          height: 1 / 6,
          width: 1 / 6,
          margin: "auto",
        }}
      />

      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: 5 }}
      >
        {userData.bio ? userData.bio : "No Bio"}
        <br />
        {userData.year ? userData.year : "No Year"}
      </Typography>
      {(!params.userID || params.userID == user.uid) && (
        <Button
          variant="text"
          size="small"
          sx={{ marginTop: 2 }}
          onClick={() => {
            alert(
              "This button should only show for current user, but no editing functionality is implemented yet."
            );
          }}
        >
          Edit Profile
        </Button>
      )}
    </Box>
  );
};

export default Profile;
