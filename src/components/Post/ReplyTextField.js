import { useState } from 'react'
import { Box } from '@mui/system'
import { TextField, Button } from '@mui/material'

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
			display: "flex",
			flexDirection: "column",
			fontSize: "12px",
			color: "#6e6e6e",
			paddingTop: "10px",
			paddingLeft: "7%",
			paddingRight: "5%",
			paddingBottom: "20px"

		}}
			borderBottom={"1px solid #e9e9e9"}
		>
			Comment as {user.displayName}
			<Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "5px", width: "100%" }}>
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
					sx={{ flexGrow: 1, width: "100%" }}
					onKeyPress={(ev) => {
						if (ev.key === 'Enter') {
							// Enter clicked
							ev.preventDefault()
							submitComment()
						}
					}}
				/>
				<Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", paddingTop: "10px" }}>
					<Button variant='contained' onClick={submitComment}>Send</Button>
				</Box>
			</Box >
		</Box >

	)
}

export default ReplyTextField
