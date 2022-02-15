import { getDatabase,  ref, push, set } from "firebase/database";


export function createPostInFirebase(postObj) {
	const db = getDatabase();
	const postListRef = ref(db, 'posts');
	const postId = push(postListRef);
	set(postId, postObj);
}