import { pushData, removeAtPath } from "./firebase.js";

export const createNotification = (
  receiverUid,
  senderUid,
  postId,
  content,
  type
) => {
  return pushData(`users/${receiverUid}/notifications`, {
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

export const deleteNotification = (notificationId, uids) => {
  uids.forEach((uid) => markNotificationAsRead(uid, notificationId));
}

const deleteCommentNotificationsRecursive = (thread, uids) => {
  // delete notifications if this comment is a direct reply to a post
  //

  // delete notifications from @ mentions on this comment
  const notifications = thread.associatedNotificationIds;
  console.log("DELETING COMMENT NOTIFICATIONS, thread:", thread);
  if (notifications) {
    console.log("DELETING THREAD NOTIFICATIONS");
    const lst = Object.values(notifications);
    if (lst.length > 0) {
      lst.forEach((notifId) => {
        deleteNotification(notifId, uids)
      });
    }
  }

  // delete notifications in children
  const children = thread.threads;
  if (children) {
    const lst = Object.values(children);
    lst.forEach((child) => deleteCommentNotificationsRecursive(child, uids));
  }
}

export const deleteCommentNotifications = (path, userList, data) => {
  console.log("DELETING TOP COMMENT NOTIFICATIONS");
  const uids = userList.map((user)=>user.uid);
  deleteCommentNotificationsRecursive(data, uids);
}
