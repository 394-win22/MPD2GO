import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserState } from "./utilities/firebase.js"; 
import Welcome from './components/Welcome'
import CreatePost from './components/CreatePost'
import { useEffect } from "react";

function App() {
  const [user] = useUserState()

  useEffect(() => {
    if (!user) return

    // Try to pull user from id
        // If it exists, then just update the user fields
        // If not, push to the DB

  }, [user])

  return (
    <>
      {user === undefined || user == null ?
        <Welcome /> :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      }
    </>
  );

}

export default App;
