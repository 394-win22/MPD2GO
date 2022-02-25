import React from 'react'
import { Box } from '@mui/material'

import Post from './Post'

const PostsList = ({ posts }) => {
  return (
    <Box sx={{ mx: 'auto', pb: 10 }}>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </Box>
  )
}

export default PostsList
