import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserState } from "./utilities/firebase.js"; 
import Welcome from './components/Welcome'
import CreatePost from './components/CreatePost'

function App() {
  const [user] = useUserState();

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
