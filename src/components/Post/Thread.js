import { useState, useContext, memo } from 'react'
import { Box } from '@mui/system'
import { Collapse, TextField, Button } from '@mui/material'
import { Message as MessageIcon } from '@mui/icons-material'
import { UserContext } from 'components/LoggedIn'
import { makeStyles } from '@mui/styles'

import Comment from './Comment.js'
import { replyToThread } from 'utilities/posts'

const useStyles = makeStyles({
	threadContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginBottom: '15px'
	},
	collapseButton: {
		display: 'flex',
		minHeight: '100%',
		width: '20px',
		boxSizing: 'border-box',
		justifyContent: 'center',
		alignItems: 'center',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	collapseLine: {
		minHeight: '100%',
		width: '5px',
		backgroundColor: 'gray',
		boxSizing: 'border-box',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	verticalContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	rowContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'flex-start'
	}

})

const Thread = ({ postId, ids, data, style }) => {
	const classes = useStyles()
	const [isShowTextField, setIsShowTextField] = useState(false)
	const [isShowThreads, setIsShowThreads] = useState(true)

	const user = useContext(UserContext).user
	const [comment, setComment] = useState('')

	const replyToComment = () => {
		// GENERATE A PATH TO PUSH TO IN DATABASE
		let path = `${postId}`
		ids.forEach((id) => {
			path += '/threads/'
			path += id
		})
		path += '/threads/'
		replyToThread(user.uid, postId, path, comment)
		setComment('')
		setIsShowTextField(false)
	}

	function getShowRepliesText(x) {
		if (x > 1) {
			return x + ' Replies'
		}
		return '1 Reply'
	}

	let sortedThreads = []
	const haveChild = ('threads' in data && Object.values(data.threads).length > 0)
	if (haveChild) sortedThreads = Object.entries(data.threads).sort().reverse()

	return (
		<Box className={classes.threadContainer} style={style}>
			<Comment author={data.author} comment={data.comment} time={data.time} />
			<Box className={classes.rowContainer}>
				{(isShowThreads && haveChild) &&
					<Box className={classes.collapseButton} onClick={() => setIsShowThreads(false)}>
						<Box className={classes.collapseLine} />
					</Box>
				}
				<Box className={classes.verticalContainer} sx={{ width: '100%' }}>
					{(isShowThreads) ?
						<Button color='primary' onClick={() => { setIsShowTextField(!isShowTextField) }}>
							Reply
							<MessageIcon style={{ marginLeft: '10px' }} />
						</Button>
						:
						(haveChild) && <Button color='primary' onClick={() => { setIsShowThreads(true) }}>
							Show {getShowRepliesText(Object.values(data.threads).length)}
						</Button>
					}
					<Collapse in={isShowTextField}>
						<TextField
							placeholder='Add comments here'
							inputProps={{ 'aria-label': 'Add comments here' }}
							value={comment}
							onChange={(e) => { setComment(e.target.value) }}
							variant='filled'
							onKeyPress={(ev) => {
								if (ev.key === 'Enter') {
									// Enter clicked
									ev.preventDefault()
									replyToComment()
								}
							}}
						/>
					</Collapse>
					<Collapse in={isShowThreads}>
						{(haveChild) && sortedThreads.map(([id, thread], i) => {
							return <Thread style={{ marginLeft: '35px' }} postId={postId} key={i} data={thread} ids={[...ids, id]} />
						})}
					</Collapse>
				</Box>
			</Box>
		</Box>
	)
}

export default memo(Thread)