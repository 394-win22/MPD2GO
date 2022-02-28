import { getDatabase, ref, push, set, increment } from 'firebase/database'
import { pushData, updateData, removeAtPath } from './firebase.js'



export const createNotification = (receiverUid, senderUid, postId, content, type) => {
	pushData(`users/${receiverUid}/notifications`, {
		senderUid: senderUid,
		postId: postId,
		content: content,
		time: Date.now(),
		type: type
	})
}

// export const createCommentNotification = (postAuthorUid, commentAuthorUid, postId, comment) => {
// 	pushData(`users/${postAuthorUid}/notifications`, {
// 		authorUid: commentAuthorUid,
// 		postId: postId,
// 		comment: comment,
// 		time: Date.now(),
// 		type: "mention"
// 	})
// }


export const markNotificationAsRead = (uid, notificationId) => {
	removeAtPath(`users/${uid}/notifications/${notificationId}`);
}