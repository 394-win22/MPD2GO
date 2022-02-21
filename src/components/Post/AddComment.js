import { useState } from "react";
import { Box, TextField, Button } from '@mui/material'

import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
	textField: {
		marginLeft: "10px",
		width: "100%"
	},


})


const AddComment = (replyToComment, setIsShowTextField) => {
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
				onKeyPress={(ev) => {
					if (ev.key === 'Enter') {
						ev.preventDefault()
						replyToComment(comment)
					}
				}}
			/>
			<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
				<Button onClick={() => setIsShowTextField(false)} >Cancel</Button>
				<Button variant="contained" sx={{}} onClick={() => replyToComment(comment)}>Send</Button>
			</Box>
		</Box>
	);
}

export default AddComment