import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";
import Home from "./components/Home";
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
      {user === undefined || user == null ? (
        <Main />
      ) : (
        
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        
      )}
    </>
  );
}

export default App;
