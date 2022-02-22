import { useState } from "react";
import { Box, TextField, Button } from '@mui/material'

import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
	textField: {
		marginTop: "10px",
		marginLeft: "10px",
		width: "100%"
	},


})


const AddComment = ({ replyToComment, setIsShowTextField }) => {
	const classes = useStyles()
	const [comment, setComment] = useState('')

	return (
		<Box sx={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}>
			<TextField
				placeholder='Add comments here'
				inputProps={{ 'aria-label': 'Add comments here', style: { fontSize: "14px" } }}
				className={classes.textField}
				value={comment}
				onChange={(e) => { setComment(e.target.value) }}
				variant='outlined'
				multiline
				minRows={1}
				maxRows={3}
				onKeyPress={(ev) => {
					if (ev.key === 'Enter') {
						ev.preventDefault()
						replyToComment(comment)
						setIsShowTextField(false)
						setComment("")
					}
				}}
			/>
			<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginTop: "10px" }}>
				<Button onClick={() => {
					setIsShowTextField(false)
					setComment("")
				}} >Cancel</Button>
				<Button variant="contained" sx={{}} onClick={() => {
					replyToComment(comment)
					setIsShowTextField(false)
					setComment("")
				}}>Send</Button>
			</Box>
		</Box>
	);
}

export default AddComment