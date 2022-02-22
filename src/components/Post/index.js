import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, IconButton, Card, Button, CardHeader, CardContent, Avatar } from '@mui/material'
import moment from 'moment'

import Thread from './Thread'
import { UserContext } from 'components/LoggedIn'
import ReplyTextField from './ReplyTextField'

const PostWithThreads = () => {
  const navigate = useNavigate()
  const context = useContext(UserContext)
  const { pageId } = useParams()

  const [post, setPost] = useState({})
  const [postAuthor, setPostAuthor] = useState({})

  const user = context.user
  const userList = context.userList
  const postList = context.postList

  useEffect(() => {
    const post = postList.find((obj) => obj.id === pageId)
    setPost(post)
    const postAuthor = userList.find((obj) => obj.uid === post.author)
    setPostAuthor(postAuthor)
  }, [pageId, postList, userList])

  let sortedThreads = []
  const haveChild = 'threads' in post && Object.values(post.threads).length > 0
  if (haveChild) sortedThreads = Object.entries(post.threads).sort().reverse()

  return (
    <>
      <Button
        sx={{ ml: 1, mb: 2, color: 'white' }}
        variant='contained'
        onClick={() => {
          navigate('/')
        }}
      >
        Back
      </Button>
      <Card sx={{ mx: 1, mb: 10 }}>
        <CardHeader
          align='left'
          avatar={
            <IconButton
              onClick={() => {
                navigate(`/profile/${postAuthor.uid}`)
              }}
              aria-label='menu'
            >
              <Avatar src={postAuthor.photoURL} aria-label='avatar' />
            </IconButton>
          }
          title={postAuthor.displayName}
          subheader={moment(post.time).format('MMMM Do YYYY, h:mm a')}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary' align='left'>
            {post.description}
          </Typography>
        </CardContent>
        <ReplyTextField post={post} user={user} />
        <CardContent sx={{ paddingLeft: "2%" }} align='left'>
          {'threads' in post &&
            Object.values(post.threads).length > 0 &&
            sortedThreads.map(([id, thread], i) => {
              return (
                <Thread key={i} postId={post.id} data={thread} ids={[id]} />
              )
            })}
        </CardContent>
      </Card>
    </>
  )
}

export default PostWithThreads