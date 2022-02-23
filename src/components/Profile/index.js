import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Typography, Avatar, Box, Divider, Button, Stack } from '@mui/material'
import { EditUserButton } from '../EditProfile/EditUserButton'
import { getUserFromUid } from 'utilities/firebase'
import { AccountCircle as AccountCircleIcon, Email as EmailIcon, Home as HomeIcon, MoreHoriz as MoreHorizIcon, AddCircle as AddCircleIcon } from '@mui/icons-material'

const Profile = ({ user }) => {
  const params = useParams()

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userToSearch = params.userID || user.uid

    getUserFromUid(userToSearch).then((data) => {
      if (!data) setUserData('not found')
      else setUserData(data)
    })
  }, [params, user])

  if (!userData) return <h1 style={{ marginLeft: 20 }}>Loading...</h1>

  if (userData === 'not found')
    return <h1 style={{ marginLeft: 20 }}>User Not Found</h1>

  return (
    <Box textAlign='center'>
      <Avatar
        alt={userData.displayName}
        src={userData.photoURL}
        variant='rounded'
        sx={{
          height: 1 / 2,
          width: 1 / 2,
          margin: "auto",
          marginBottom: '30px',
          borderRadius: "50%",
        }}
      />
      <Typography
        variant='h4'
        component='div'
        sx={{ flexGrow: 1, paddingLeft: 1, paddingBottom: 1, marginBottom: "0px" }}
      >
        {userData.displayName}
      </Typography>
      <Typography
        variant='h8'
        component='div'
        sx={{ flexGrow: 1, paddingLeft: 1, paddingBottom: 5, marginBottom: "5px" }}
      >
        Chicago, IL [PLACE]
      </Typography>
      <Divider/>
      <Typography
        variant='h8'
        component='div'
        sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: 5 }}
      >
        {userData.year ? "MPD2 Class of " + userData.year : 'No Year'}
      </Typography>
      {/*<Typography
        variant='h6'
        component='div'
        sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: 5 }}
      >
        {userData.bio ? userData.bio : 'No Bio'}
        <br />
        <br />
        
        {(!params.userID || params.userID === user.uid) && (
        <EditUserButton
        key={userData}
        user={userData}
        userID={user.uid}
      />
      )}
      </Typography>*/}
      <Stack direction="row" align="center">
        <Typography align="center">
          Current student
        </Typography>
        <Button align="center">
          Green team
        </Button>
      </Stack>
      <Button variant="contained"
          color="success"
          sx={{marginBottom: 3}}>
        View Capstone Page
      </Button>
      <Divider/>
      <Typography align="left" sx={{marginBottom: 3}}>
          Expertise
      </Typography>
      <Stack direction="row"
        sx={{marginBottom: 3}}>
        {["Rocket Science", "Product Design"].map(x => (
         <Button style={{
            borderRadius: 15,
            backgroundColor: "#B6B6B6",
            padding: "3px 6px",
            fontSize: "10px"
        }}
        variant="contained">
          {x}
        </Button>
        ))}
      </Stack>
      <Divider/>
      <Stack direction="row"
        sx={{marginBottom: 3}}>
          <EmailIcon/>
          <Typography>mail link</Typography>
      </Stack>
      <Stack direction="row"
        sx={{marginBottom: 3}}>
        <AddCircleIcon/>
        <Typography>linkedIn link</Typography>
      </Stack>
    </Box>
  )
}

export default Profile
