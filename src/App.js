import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useUserState, signInWithGoogle} from "./utilities/firebase.js"; 

function App() {

  const [user] = useUserState();
  
  return (
    <>
      (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        {/* {user && <BottomMenu user={user} />} */}
      </BrowserRouter>)
    </>
  );

}

export default App;
