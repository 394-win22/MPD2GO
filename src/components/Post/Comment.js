import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Avatar, Typography, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import moment from 'moment'

import { UserContext } from 'components/LoggedIn'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  avatar: {
    marginTop: '4px',
    width: '20px',
    height: '20px',
  },
  contentContainer: {
    marginLeft: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  time: {
    // marginLeft: '70px',
    marginTop: '1px',
    color: '#888888',
    fontSize: '13px',
  },
})

export default function Comment({ author, time, comment }) {
  const navigate = useNavigate()
  const classes = useStyles()
  const context = useContext(UserContext)
  
  const userList = context.userList
  const postAuthor = userList.find((obj) => obj.uid === author)

  return (
    <Box className={classes.container}>
      <IconButton
        sx={{ marginRight: -1 }}
        onClick={() => {
          navigate(`/profile/${postAuthor.uid}`)
        }}
      >
        <Avatar className={classes.avatar} src={postAuthor.photoURL} />
      </IconButton>
      <Box className={classes.contentContainer}>
        <Box className={classes.infoContainer}>
          <Typography variant='subtitle2'>{postAuthor.displayName}</Typography>
          <Typography className={classes.time}>
            {moment(time).format('MMMM Do YYYY, h:mm a')}
          </Typography>
        </Box>
        <Typography variant='body2'>{comment}</Typography>
      </Box>
    </Box>
  )
}
