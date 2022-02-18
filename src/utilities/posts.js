import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { database, pushData, setData, firebase } from "./firebase.js";

export function createPostInFirebase(postObj) {
  const db = getDatabase();
  const postListRef = ref(db, "posts");
  const postId = push(postListRef);
  set(postId, postObj);
}

export function addCommentToPost(uid, postId, comment) {
  pushData(`posts/${postId}/threads`, {
    author: uid,
    comment: comment,
    time: Date.now(),
  });

  //   setData(`posts/${postId}`, {
  //     numComments: firebase.database.ServerValue.increment(1),
  //   });
}

export function replyToThread(uid, path, comment) {
  pushData(`posts/${path}`, {
    author: uid,
    comment: comment,
    time: Date.now(),
  });
}
