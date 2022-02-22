import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Typography, Avatar, Box } from '@mui/material'
import { EditUserButton } from '../EditProfile/EditUserButton'
import { getUserFromUid } from 'utilities/firebase'

const Profile = ({ user }) => {
  const params = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userToSearch = params.userID || user.uid;

    getUserFromUid(userToSearch).then((data) => {
      if (!data) setUserData("not found");
      else setUserData(data);
    });
  }, [params, user]);

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
          margin: 'auto',
          borderRadius: "50%",
        }}
      />
      <Typography
        variant='h8'
        component='div'
        sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: 5 }}
      >
        {userData.year ? "Class of " + userData.year : 'No Year'}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: 5 }}
      >
        {userData.bio ? userData.bio : "No Bio"}
        <br />
        <br />
        
        {(!params.userID || params.userID === user.uid) && (
        <EditUserButton
        key={userData}
        user={userData}
        userID={user.uid}
      />
      )}
      </Typography>
    </Box>
  );
};

export default Profile;
