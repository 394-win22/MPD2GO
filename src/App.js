import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";

function App() {
  return (
    <>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        {/* {user && <BottomMenu user={user} />} */}
      </BrowserRouter>
    </>
  );
}

export default App;
