import { getDatabase, ref, push, set, increment } from 'firebase/database'
import { pushData, updateData, removeAtPath } from './firebase.js'



export const createCommentNotification = (postAuthorUid, commentAuthorUid, postId, comment) => {
	pushData(`users/${postAuthorUid}/notifications`, {
		authorUid: commentAuthorUid,
		postId: postId,
		comment: comment,
		time: Date.now(),
		type: "comment"
	})
}


export const markNotificationAsRead = (uid, notificationId) => {
	removeAtPath(`users/${uid}/notifications/${notificationId}`);
}