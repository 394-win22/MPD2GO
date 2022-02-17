import { useEffect, useState } from "react"
import { Typography, Avatar, Box } from "@mui/material"
import { useParams } from "react-router"

import TopNavBar from "./TopNavBar"
import { getUserFromUid } from "../utilities/firebase"

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    if (!('userID' in params)) {
      setLoading(false)
      return
    }

    getUserFromUid(params.userID).then((user) => {
      console.log(user)
      setLoading(false)
    })

  }, [params])

  if (loading)
    return <h1>Loading...</h1>

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