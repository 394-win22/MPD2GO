import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import {database, pushData} from "./firebase.js";


export function createPostInFirebase(postObj) {
	const db = getDatabase();
	const postListRef = ref(db, 'posts');
	const postId = push(postListRef);
	set(postId, postObj);
}

export function addCommentToPost(uid, postId, comment) {
	console.log("adding comment to post", comment, postId);
	pushData(`posts/${postId}/threads`, {
		author: uid,
		comment: comment,
		time: Date.now()
	});
}
