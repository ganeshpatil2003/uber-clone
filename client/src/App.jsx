import { Route, Routes } from "react-router-dom";
import UserLogIn from "./pages/UserLogIn";
import UserSignUp from "./pages/UserSignUp";
import Home from "./pages/Home";
import CaptainLogIn from "./pages/CaptainLogIn";
import CaptainSignUp from "./pages/CaptainSignUp";
import Start from "./pages/Start";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/captain-login" element={<CaptainLogIn />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        <Route path="/home" element ={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
