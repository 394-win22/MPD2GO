import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
  connectStorageEmulator,
} from "firebase/storage";
import {
  getDatabase,
  onValue,
  ref,
  set,
  push,
  update,
  remove,
  connectDatabaseEmulator,
} from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onIdTokenChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  connectAuthEmulator,
  // signInWithCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALmMHVtIxzi3hogJcDlbbaue9_nfEzUjQ",
  authDomain: "hive-mpd2.firebaseapp.com",
  databaseURL: "https://hive-mpd2-default-rtdb.firebaseio.com",
  projectId: "hive-mpd2",
  storageBucket: "hive-mpd2.appspot.com",
  messagingSenderId: "276071050379",
  appId: "1:276071050379:web:50d75b811610e8f60df88e",
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const database = getDatabase(firebase);
export const storage = getStorage();

if (window.Cypress) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);
  connectStorageEmulator(storage, "localhost", 9199);
  // signInWithCredential(auth, GoogleAuthProvider.credential(
  //   '{"sub": "U7npX0jtE4ssHAPKwXV5q9bvPjPQ", "email": "test@example.com", "displayName":"Testing User 1", "email_verified": true}'
  // ));
}

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser);
  }, []);

  return user;
};

/* data functions */
export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val();
        setData(transform ? transform(val) : val);
        setIsLoading(false);
        setError(null);
      },
      (error) => {
        setData(null);
        setIsLoading(false);
        setError(error);
      }
    );
  }, [path, transform]);

  return [data, isLoading, error];
};

export const setData = (path, value) => set(ref(database, path), value);

export const pushData = (path, value) => push(ref(database, path), value);

export const updateData = (path, value) => update(ref(database, path), value);

export const removeAtPath = (path) => remove(ref(database, path));

/* authentication functions */
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });

  signInWithPopup(getAuth(firebase), provider);
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    class user {
      constructor() {
        this.email = email;
        this.uid = res._tokenResponse.localId;
        this.displayName = name;
        this.photoURL =
          "https://firebasestorage.googleapis.com/v0/b/hive-mpd2.appspot.com/o/demo_ico%2Fdefult%20avatar.png?alt=media&token=b6439e6a-b4b6-4440-aff7-9bccd9df7a36";
      }
    }
    const newUser = new user();
    saveUserToDb(newUser);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const getUserStatus = (userData) => {
  if ("isStaff" in userData && userData.isStaff) {
    return "Staff"
  }
  if (!("year" in userData) || userData.year === "") {
    return "Unknown Status";
  }
  if (userData.year < new Date().getFullYear()) {
    return "Alumni";
  } else {
    return "Current Student";
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert(
      "Check your email. You'll receive a link to reset your account password."
    );
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const deleteData = (dataPath) => {
  const listRef = ref(database, dataPath);
  remove(listRef);
};

export const addPost = (post) => {
  pushData("/post/", {
    author: post.author,
    description: post.author,
    time: post.author,
    title: post.title,
  });
};

export const saveUserToDb = (userObject) => {
  setData("/users/" + userObject.uid, {
    displayName: userObject.displayName,
    email: userObject.email,
    photoURL: userObject.photoURL,
    bio: userObject.bio || "",
    year: userObject.year || "",
    location: userObject.location || "",
    isStaff: userObject.isStaff || false,
  });
  window.location.href = "/";
};

export const getUserFromUid = async (uid) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database, `/users/${uid}`);
    onValue(
      dbRef,
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getProjectFromUid = (projectId) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database, `/project/${projectId}`);
    onValue(
      dbRef,
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const uploadPhotoToStorage = async (image) => {
  const storageRef = sRef(storage, "images/" + image.name);
  return uploadBytes(storageRef, image).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((downloadURL) => downloadURL)
  );
};

export const addToProject = (userId, project) => {
  pushData("project/" + project.id + "/member", userId);
};

export const removeFromProject = (userId, project) => {
  let newMemberArray = Object.values(project.member).filter((user) => {
    return user !== userId
  });
  setData("project/" + project.id + "/member", newMemberArray);
};

export const getProjectFromId = (id, projectList) => {
  return projectList.filter((project) => project.id === id)[0];
}
