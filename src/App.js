import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  useUserState,
  getUserFromUid,
  saveUserToDb,
} from "./utilities/firebase.js";
import Welcome from "./components/Welcome";
import CreatePost from "./components/CreatePost";
import { useEffect } from "react";
import Profile from "./components/Profile";

function App() {
  const [user, setUser] = useUserState();

  useEffect(async () => {
    if (!user) return;

    await getUserFromUid(user.uid).then((userData) => {
      if (!userData) {
        saveUserToDb(user);
      }
    });
  }, [user]);

  return (
    <>
      {user === undefined || user == null ? (
        <Welcome />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/profile" element={<Profile user={user} />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
