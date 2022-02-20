import { getDatabase, ref, push, set, increment } from 'firebase/database'

import { pushData, updateData } from './firebase.js'

export const createPostInFirebase = (postObj) => {
  const db = getDatabase()
  const postListRef = ref(db, 'posts')
  const postId = push(postListRef)
  
  set(postId, postObj)
}

export const addCommentToPost = (uid, postId, comment) => {
  pushData(`posts/${postId}/threads`, {
    author: uid,
    comment: comment,
    time: Date.now(),
  })
  updateData(`posts/${postId}`, {
    numComments: increment(1)
  })
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
