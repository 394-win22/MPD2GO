import { getDatabase, ref, push, set, increment } from 'firebase/database'

import { pushData, updateData } from './firebase.js'

import { createNotification } from "./notifications";

export const createPostInFirebase = (postObj) => {
  const db = getDatabase()
  const postListRef = ref(db, 'posts')
  const postId = push(postListRef)

  set(postId, postObj);
  return postId.key;
  
}

export const addCommentToPost = (postAuthorUid, commentAuthorUid, postId, comment) => {
  pushData(`posts/${postId}/threads`, {
    author: commentAuthorUid,
    comment: comment,
    time: Date.now(),
  })
  updateData(`posts/${postId}`, {
    numComments: increment(1)
  })
  createNotification(postAuthorUid, commentAuthorUid, postId, comment, "comment");
}

export const replyToThread = (uid,postAuthorUid, postId, path, comment) => {
  pushData(`posts/${path}`, {
    author: uid,
    comment: comment,
    time: Date.now(),
  })
  updateData(`posts/${postId}`, {
    numComments: increment(1)
  })
  createNotification(postAuthorUid, uid, postId, comment, "reply");
}

export const getUserDataFromUID = (uid, users) => {
  return users.find((user) => user.uid === uid);
};