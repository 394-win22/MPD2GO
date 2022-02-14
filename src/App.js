import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useUserState, signInWithGoogle} from "./utilities/firebase.js";
import CreatePost from './components/CreatePost.js'

function App() {

  const [user] = useUserState();

  return (
    <>
      (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
					<Route path="/createPost" element={<CreatePost />} />
        </Routes>
        {/* {user && <BottomMenu user={user} />} */}
      </BrowserRouter>)
    </>
  );

}

export default App;
