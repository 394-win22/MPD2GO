
import { Route, Routes } from "react-router-dom";

import NotFound from "components/NotFound";
import Home from "./Home";
import Tutorial from "components/Tutorial";

const Login = () => {

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/tutorial" element={<Tutorial />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
};

export default Login;
