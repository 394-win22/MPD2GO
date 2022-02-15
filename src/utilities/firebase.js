import { initializeApp } from "firebase/app";
import { useState, useEffect } from "react";
import "firebase/storage";
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  onValue,
  ref,
  set,
  push,
  query,
  orderByChild,
  startAt,
  remove,
} from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsLijH-2wBUfU_NwzNNLTBadqqNIHxtFQ",
  authDomain: "mpd2go.firebaseapp.com",
  databaseURL: "https://mpd2go-default-rtdb.firebaseio.com",
  projectId: "mpd2go",
  storageBucket: "mpd2go.appspot.com",
  messagingSenderId: "792215885159",
  appId: "1:792215885159:web:2f30dc65fba26c7644cbc2"
};

export const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);
const storage = getStorage();

/* authentication functions */
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  signInWithPopup(getAuth(firebase), provider);
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return [user];
};

/* data functions */
export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};

export const useEvents = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const orderByRef = query(
      ref(database, "/events"),
      orderByChild("eventTime")
    );
    const startAtRef = query(orderByRef, startAt(Date.now()));
    return onValue(
      startAtRef,
      (snapshot) => {
        const val = snapshot.val();
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => set(ref(database, path), value);

export const pushData = (path, value) => {
  const listRef = ref(database, path);
  const objRef = push(listRef);
  set(objRef, value);
};

export const deleteData = (dataPath) => {
  const listRef = ref(database, dataPath);
  remove(listRef);
};

export const saveUserToDb = (userObject) => {
  console.log(userObject)
  setData("/users/" + userObject.uid, {
    displayName: userObject.displayName,
    email: userObject.email,
    photoURL: userObject.photoURL,
  });
  setData("/user-data/" + userObject.uid, {
    bio: "",
    year: "",
  });
};

export const getUserDataFromUid = async (uid) => {
  const dbRef = ref(database, `/users/${uid}`);
  var output;
  await onValue(
    dbRef,
    (snapshot) => {
      // return val;
      output = snapshot.val();
    },
    (error) => {}
  );
  return output;
};

export const uploadPhotoToStorage = async (image) => {
  const storageRef = sRef(storage, "images/" + image.name);
  return uploadBytes(storageRef, image).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((downloadURL) => downloadURL)
  );
};
