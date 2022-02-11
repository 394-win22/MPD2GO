import logo from "./logo.svg";
import "./App.css";
import Welcome from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useUserState, signInWithGoogle} from "./utilities/firebase.js"; 







function App() {

  const [user] = useUserState()

    console.log(user)
  return (
    <>
    { user ?
    
      (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
        {/* {user && <BottomMenu user={user} />} */}
      </BrowserRouter>)
    
    : signInWithGoogle()}
    </>
  );

}

export default App;
