import { pushData, removeAtPath } from "./firebase.js";

export const createNotification = (
  receiverUid,
  senderUid,
  postId,
  content,
  type
) => {
  pushData(`users/${receiverUid}/notifications`, {
    senderUid: senderUid,
    postId: postId,
    content: content,
    time: Date.now(),
    type: type,
  });
};

export const markNotificationAsRead = (uid, notificationId) => {
  removeAtPath(`users/${uid}/notifications/${notificationId}`);
};
