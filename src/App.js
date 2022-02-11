import logo from "./logo.svg";
import "./App.css";
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      {" "}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
        {/* {user && <BottomMenu user={user} />} */}
      </BrowserRouter>
    </>
  );
}

export default App;
