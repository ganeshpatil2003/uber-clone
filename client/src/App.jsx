import { Route, Routes } from "react-router-dom";
import UserLogIn from "./pages/UserLogIn";
import UserSignUp from "./pages/UserSignUp";
import Home from "./pages/Home";
import CaptainLogIn from "./pages/CaptainLogIn";
import CaptainSignUp from "./pages/CaptainSignUp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/captain-login" element={<CaptainLogIn />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
      </Routes>
    </>
  );
}

export default App;
