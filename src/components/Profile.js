import TopNavBar from "./TopNavBar"
import { Typography, Avatar, Box } from "@mui/material"
import { useParams } from "react-router"

const Profile = ({ user }) => {

  let params = useParams()
  console.log(Object.keys(params).length === 0)

  return (
    <>
      <TopNavBar isLoggedIn={user ? true : false} />
      <Box margin='auto'> 
        <Typography
          variant="h3"
          component="div"
          align="center"
          sx={{ flexGrow: 1, paddingLeft: 1, paddingBottom: 5 }}
        >
          {user.displayName}
        </Typography>
        <Avatar 
          alt={user.displayName} 
          src={user.photoURL}
          variant='rounded'
          sx={{
            height: 1/6,
            width: 1/6,
            margin: 'auto'
        }} />

        <Typography
          variant="h6"
          component="div"
          align="center"
          sx={{ flexGrow: 1, paddingLeft: 1, paddingTop: 5 }}
        >
          {user.bio ? user.bio : "No Bio"}
          <br />
          {user.year ? user.year : "No Year"}
        </Typography>
      </Box>
    </>
  )
}

export default Profile