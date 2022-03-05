import { getDatabase, ref, push, set, increment } from "firebase/database";
import { pushData, updateData } from "./firebase.js";
import { createNotification } from "./notifications";

export const createPostInFirebase = (postObj) => {
  const db = getDatabase();
  const postListRef = ref(db, "posts");
  const postId = push(postListRef);

  set(postId, postObj);
  return postId.key;
};

export const addCommentToPost = (
  postAuthorUid,
  commentAuthorUid,
  postId,
  comment,
  notifications,
) => {
  const notificationPath = createNotification(
    postAuthorUid,
    commentAuthorUid,
    postId,
    comment,
    "comment"
  ).toString().split('/');
  const notificationId = notificationPath[notificationPath.length-1];
  if (notifications) {
    //console.log("util notifications:", notifications);
    notifications.push(notificationId);
  }
  pushData(`posts/${postId}/threads`, {
    author: commentAuthorUid,
    comment: comment,
    time: Date.now(),
    associatedNotificationIds: notifications,
  });
  updateData(`posts/${postId}`, {
    numComments: increment(1),
  });
};

export const replyToThread = (uid, postId, path, comment, notifications) => {
  pushData(`posts/${path}`, {
    author: uid,
    comment: comment,
    time: Date.now(),
    associatedNotificationIds: notifications,
  });
  updateData(`posts/${postId}`, {
    numComments: increment(1),
  });
};

export const getUserDataFromUID = (uid, users) => {
  return users.find((user) => user.uid === uid);
};

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const colourIsLight = function (hex) {
  const r = hexToRgb(hex).r;
  const g = hexToRgb(hex).g;
  const b = hexToRgb(hex).b;
  // Counting the perceptive luminance
  // human eye favors green color...
  var a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return a < 0.5;
};

export const textColor = (hex) => (colourIsLight(hex) ? "black" : "white");
