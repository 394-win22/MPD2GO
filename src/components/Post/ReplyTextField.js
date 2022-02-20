import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Box } from '@mui/system'
import { Avatar, Divider, TextField, IconButton } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'

import { addCommentToPost } from '../../utilities/posts.js'

const ReplyTextField = ({ post, user }) => {
	const [comment, setComment] = useState('')
	const navigate = useNavigate()

	const submitComment = () => {
		addCommentToPost(user.uid, post.id, comment)
		setComment('')
	}

	return (
		<Box sx={{
			p: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: '100%',
		}
		}
		>
			<IconButton onClick={() => {navigate(`/profile/${user.uid}`)}} sx={{ p: '10px' }} aria-label='menu'>
				<Avatar aria-label='recipe' src={user.photoURL}></Avatar>
			</IconButton>
			<TextField
				sx={{ ml: 1, flex: 1 }}
				placeholder='Comment on this post'
				inputProps={{ 'aria-label': 'Comment on this post' }}
				onChange={(e) => { setComment(e.target.value) }}
				variant='standard'
				value={comment}
				onKeyPress={(ev) => {
					if (ev.key === 'Enter') {
						// Enter clicked
						ev.preventDefault()
						submitComment()
					}
				}}
			/>
			<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
			<IconButton onClick={submitComment} sx={{ p: '10px', paddingRight: '10px' }} aria-label='search'>
				<SendIcon />
			</IconButton>
		</Box >

	)
}

export default ReplyTextField
