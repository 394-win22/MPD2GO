import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import {database} from "./firebase.js";


export function createPostInFirebase(postObj) {
	const db = getDatabase();
	const postListRef = ref(db, 'posts');
	const postId = push(postListRef);
	set(postId, postObj);
}

export const useData = (path, transform) => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
  
	useEffect(() => {
	  const dbRef = ref(database, path);
	  const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
	  if (devMode) { console.log(`loading ${path}`); }
	  return onValue(dbRef, (snapshot) => {
		const val = snapshot.val();
		if (devMode) { console.log(val); }
		setData(transform ? transform(val) : val);
		setLoading(false);
		setError(null);
	  }, (error) => {
		setData(null);
		setLoading(false);
		setError(error);
	  });
	}, [path, transform]);
  
	return [data, loading, error];
  };

  