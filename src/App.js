import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  useUserState,
  getUserDataFromUid,
  saveUserToDb,
} from "./utilities/firebase.js";
import Welcome from "./components/Welcome";
import CreatePost from "./components/CreatePost";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useUserState();

  useEffect(async () => {
    if (!user) return;

    await getUserDataFromUid(user.uid).then((userData) => {
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
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
