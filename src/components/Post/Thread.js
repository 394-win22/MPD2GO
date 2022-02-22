import { useState, useContext, memo } from 'react'
import { Box, Collapse, TextField, Button } from '@mui/material'
import { Message as MessageIcon } from '@mui/icons-material'
import { UserContext } from 'components/LoggedIn'
import { makeStyles } from '@mui/styles'
import { Avatar, Typography, IconButton } from '@mui/material'
import { replyToThread } from 'utilities/posts'
import { useNavigate } from 'react-router'
import moment from 'moment'

import AddComment from './AddComment'


const useStyles = makeStyles({
	// Comment
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginBottom: '15px',
		alignItems: "stretch"
	},
	leftContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	rightContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		height: "100%",
		minWidth: "0px"
	},
	avatarButton: {
		width: "30px",
		height: "30px",
		display: "flex",
		marginTop: '4px',
		marginRight: '1px',
		marginLeft: '4px',
		justifyContent: "center",
		alignItems: "center"
	},
	avatar: {
		width: '24px',
		height: '24px',
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
		marginBottom: "4px"
	},
	time: {
		color: '#888888',
		fontSize: '13px',
	},
	collapseButton: {
		display: 'flex',
		marginTop: "10px",
		width: '20px',
		boxSizing: 'border-box',
		justifyContent: 'center',
		alignItems: 'center',
		'&:hover': {
			cursor: 'pointer'
		},
		flexGrow: 1
	},
	collapseLine: {
		minHeight: '100%',
		width: '3px',
		backgroundColor: '#eaeaea',
		boxSizing: 'border-box',
		'&:hover': {
			cursor: 'pointer'
		}
	},
	buttonContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "5px"
	},

	replyButton: {
		fontSize: "13px",
		padding: "8px 14px 8px 14px",
	},
	showReplies: {
		fontSize: "13px",
		padding: "8px 14px 8px 10px",
	}

})

const Thread = ({ postId, ids, data, style }) => {
	const classes = useStyles()
	const navigate = useNavigate()
	const user = useContext(UserContext).user
	const userList = useContext(UserContext).userList
	const postAuthor = userList.find((obj) => obj.uid === data.author)
	const [isShowTextField, setIsShowTextField] = useState(false)
	const [isShowThreads, setIsShowThreads] = useState(true)

	const replyToComment = (comment) => {
		// GENERATE A PATH TO PUSH TO IN DATABASE
		let path = `${postId}`
		ids.forEach((id) => {
			path += '/threads/'
			path += id
		})
		path += '/threads/'
		replyToThread(user.uid, postId, path, comment)
		setIsShowTextField(false)
	}

	function getShowRepliesText(x) {
		if (x > 1) {
			return x + ' Replies'
		}
		return '1 Reply'
	}

	// if not showThreads, hide textbox
	let sortedThreads = []
	const haveChild = ('threads' in data && Object.values(data.threads).length > 0)
	if (haveChild) sortedThreads = Object.entries(data.threads).sort().reverse()
	return (
		<Box className={classes.container} style={style}>
			<Box className={classes.leftContainer}>
				<IconButton
					sx={{ marginRight: -1 }}
					className={classes.avatarButton}
					onClick={() => {
						navigate(`/profile/${postAuthor.uid}`)
					}}
				>
					<Avatar className={classes.avatar} src={postAuthor.photoURL} />
				</IconButton>

				{(isShowThreads && haveChild) ?
					<Box className={classes.collapseButton} onClick={() => setIsShowThreads(false)}>
						<Box className={classes.collapseLine} />
					</Box> :
					<Box className={classes.collapseButton} />
				}
			</Box>
			<Box className={classes.rightContainer}>
				{/* comment */}
				<Box className={classes.contentContainer}>
					<Box className={classes.infoContainer}>
						<Typography variant='subtitle2'>{postAuthor.displayName}</Typography>
						<Typography className={classes.time}>
							{moment(data.time).format('MMMM Do YYYY, h:mm a')}
						</Typography>
					</Box>
					<Typography variant='body2'>{data.comment}</Typography>
				</Box>

				{/* Box to add comment */}
				<Collapse in={isShowTextField} sx={{ width: "100%" }}>
					<AddComment replyToComment={replyToComment} setIsShowTextField={setIsShowTextField} />
				</Collapse>

				{/* buttons to show threads and/or view comments  */}
				<Box className={classes.buttonContainer}>
					{(!isShowThreads && haveChild) && <Button color='primary' className={classes.showReplies} onClick={() => { setIsShowThreads(true) }}>
						Show {getShowRepliesText(Object.values(data.threads).length)}
					</Button>
					}

					{(!isShowTextField) &&
						<Button className={classes.replyButton} color='primary' onClick={() => { setIsShowTextField(!isShowTextField) }}>
							Reply
							<MessageIcon style={{ marginLeft: '5px', height: "16px", marginTop: "2px" }} />
						</Button>}
				</Box>

				{/* child threads */}
				<Collapse in={isShowThreads}>
					{(haveChild) && sortedThreads.map(([id, thread], i) => {
						return <Thread style={{ marginLeft: '0px' }} postId={postId} key={i} data={thread} ids={[...ids, id]} />
					})}
				</Collapse>
			</Box>
		</Box >
	)
}

export default memo(Thread)