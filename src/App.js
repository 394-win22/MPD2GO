import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserState } from "./utilities/firebase.js"; 
import Welcome from './components/Welcome'

function App() {
  const [user] = useUserState();
  
  return (
    <>
      {user === undefined || user == null ?
        <Welcome /> :
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home user={user}/>} />
          </Routes>
        </BrowserRouter>
      }
    </>
  );

}

export default App;
