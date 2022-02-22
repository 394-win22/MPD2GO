import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Box } from '@mui/system'
import { Avatar, Divider, TextField, IconButton } from '@mui/material'
import { Send as SendIcon } from '@mui/icons-material'

import { addCommentToPost } from '../../utilities/posts.js'

const ReplyTextField = ({ post, user }) => {
	const [comment, setComment] = useState('')

	const submitComment = () => {
		addCommentToPost(user.uid, post.id, comment)
		setComment('')
	}

	return (
		<Box sx={{
			alignItems: 'flex-start',
			// width: '100%',
			display: "flex",
			flexDirection: "column",
			fontSize: "12px",
			// marginLeft: "30px",
			// padding: "5px 50px 20px 50px",
			color: "#6e6e6e",
			paddingTop: "10px",
			paddingLeft: "7%",
			paddingRight: "5%",
			paddingBottom: "20px"

		}}
			borderBottom={"1px solid #e9e9e9"}
		>
			Comment as {user.displayName}
			<Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "5px", width: "100%" }}>
				<TextField
					placeholder='Comment on this post'
					inputProps={{ style: { fontSize: "13px" } }}
					onChange={(e) => { setComment(e.target.value) }}
					variant='outlined'
					value={comment}
					multiline
					minRows={2}
					maxRows={4}
					autoComplete='off'
					sx={{ flexGrow: 1 }}
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
		</Box >

	)
}

export default ReplyTextField
