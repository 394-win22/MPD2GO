import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import Login from "./components/Login";

import {
  useUserState,
  getUserDataFromUid,
  saveUserToDb,
} from "./utilities/firebase.js";
import CreatePost from "./components/CreatePost";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useUserState();

  useEffect( () => {
    if (!user) return;
     getUserDataFromUid(user.uid).then((userData) => {
      if (!userData) {
        saveUserToDb(user);
      }
    });
  }, [user]);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main user={user} />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
