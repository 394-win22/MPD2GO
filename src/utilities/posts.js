import { getDatabase, ref, push, set, increment } from 'firebase/database'

import { pushData, updateData } from './firebase.js'

import { createCommentNotification } from "./notifications";

export const createPostInFirebase = (postObj) => {
  const db = getDatabase()
  const postListRef = ref(db, 'posts')
  const postId = push(postListRef)

  set(postId, postObj)
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
  createCommentNotification(postAuthorUid, commentAuthorUid, postId, comment);
}

export const replyToThread = (uid, postId, path, comment) => {
  pushData(`posts/${path}`, {
    author: uid,
    comment: comment,
    time: Date.now(),
  })
  updateData(`posts/${postId}`, {
    numComments: increment(1)
  })
}

export const getUserDataFromUID = (uid, users) => {
  return users.find((user) => user.uid === uid);
};