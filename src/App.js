import "./App.css";
import Main from "./components/Main";
import { useState }  from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import {
  useUserState,
  getUserDataFromUid,
  saveUserToDb,
} from "./utilities/firebase.js";
import CreatePost from "./components/CreatePost";
import { useEffect } from "react";

function App() {
  const [user] = useUserState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTimeout(() => {setLoading(false)}, 100)
      return
    }

    getUserDataFromUid(user.uid).then((userData) => {
      if (!userData) saveUserToDb(user);
      setLoading(false)
    });
  }, [user]);

  if (loading)
    return <h2>Loading...</h2>

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        
          <Routes>
            <Route path="/" element={<Main user={user} />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        
      )}
    </>
  );
}

export default App;
