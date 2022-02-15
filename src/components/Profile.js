import { useEffect, useState } from "react"
import { getUserDatafromUid, saveUserDataToDb } from "../utilities/firebase"

const Profile = ({ user }) => {
  const [userData, setUserData] = useState({})

  useEffect(async () => {
    if (!user) return

    getUserDatafromUid(user.uid).then((retrievedData) => {
      let userData
      if (!retrievedData) {
        userData = {
          uid: user.uid,
          bio: "",
          year: "",
        }
        saveUserDataToDb(userData)
      } else userData = retrievedData
      
      setUserData(userData)
    })

    // Use user.uuid to get userdata for that user 
    //    If empty, then set up temp data
    //    Else, display data
  }, [user])

  return (
    <>
      <h2>{user.displayName}</h2>
      <p>{userData.bio ? userData.bio : "No Bio"}</p>
      <p>{userData.year ? userData.year : "No Year"}</p>
      <img src={user.photoURL} />
    </>
  )
}

export default Profile