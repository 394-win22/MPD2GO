import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getDatabase, onValue, ref, set, push, update, remove } from 'firebase/database'
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyALmMHVtIxzi3hogJcDlbbaue9_nfEzUjQ",
  authDomain: "hive-mpd2.firebaseapp.com",
  databaseURL: "https://hive-mpd2-default-rtdb.firebaseio.com",
  projectId: "hive-mpd2",
  storageBucket: "hive-mpd2.appspot.com",
  messagingSenderId: "276071050379",
  appId: "1:276071050379:web:50d75b811610e8f60df88e"
}

export const firebase = initializeApp(firebaseConfig)
export const database = getDatabase(firebase)
const storage = getStorage()

const firebaseSignOut = () => signOut(getAuth(firebase))

export { firebaseSignOut as signOut }

export const useUserState = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    onIdTokenChanged(getAuth(firebase), setUser)
  }, [])

  return user
}

/* data functions */
export const useData = (path, transform) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    const dbRef = ref(database, path)
    return onValue(
      dbRef,
      (snapshot) => {
        const val = snapshot.val()
        setData(transform ? transform(val) : val)
        setIsLoading(false)
        setError(null)
      },
      (error) => {
        setData(null)
        setIsLoading(false)
        setError(error)
      }
    )
  }, [path, transform])

  return [data, isLoading, error]
}

export const setData = (path, value) => set(ref(database, path), value)

export const pushData = (path, value) => push(ref(database, path), value)

export const updateData = (path, value) => update(ref(database, path), value)

/* authentication functions */
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({
    prompt: 'select_account',
  })

  signInWithPopup(getAuth(firebase), provider)
}

export const deleteData = (dataPath) => {
  const listRef = ref(database, dataPath)
  remove(listRef)
}

export const addPost = (post) => {
  pushData('/post/', {
    author: post.author,
    description: post.author,
    time: post.author,
    title: post.title,
  })
}

export const saveUserToDb = (userObject) => {
  setData('/users/' + userObject.uid, {
    displayName: userObject.displayName,
    email: userObject.email,
    photoURL: userObject.photoURL,
    bio: userObject.bio || '',
    year: userObject.year || '',
  })
}

export const getUserFromUid = async (uid) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database, `/users/${uid}`)
    onValue(
      dbRef,
      snapshot => {
        resolve(snapshot.val())
      }, (error) => {
        reject(error)
      }
    )
  })
}

export const uploadPhotoToStorage = async (image) => {
  const storageRef = sRef(storage, 'images/' + image.name)
  return uploadBytes(storageRef, image).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((downloadURL) => downloadURL)
  )
}
