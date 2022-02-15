// Import the functions you need from the SDKs you need
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut, useAuthState} from 'firebase/auth';

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

export const useUserState = () => {
    const [user, setUser] = useState();
    
    useEffect(() => {
      onIdTokenChanged(getAuth(firebase), setUser);
    }, []);
    //alert(user)
    return [user];
};

export const saveUserToDb = (userObject) => {
  setData("/users/" + userObject.uid, {
    displayName: userObject.displayName,
    email: userObject.email,
    photoURL: userObject.photoURL,
  });
}

export const deleteData = (dataPath) => {
  const listRef = ref(database, dataPath);
  remove(listRef);
};

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

export const getUserDataFromUid = async (uid) => {
  const dbRef = ref(database, `/users/${uid}`);
  var output;
  await onValue(
    dbRef,
    (snapshot) => {
      const val = snapshot.val();
      // return val;
      output = snapshot.val();
    },
    (error) => {

    }
  );
  return output;
}

/* authentication functions */
export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
  
    signInWithPopup(getAuth(firebase), provider);
};

const firebaseSignOut = () => signOut(getAuth(firebase))
export {firebaseSignOut as signOut};