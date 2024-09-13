// CSS
import "./App.css";
// components
import Navbar from "./components/Navbar/Navbar.js";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import Profile from "./pages/Profile/Profile.js";
import Signup from "./pages/Signup/Signup.js";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element= {<Profile/>} />
      </Routes>
    </>
  );
}

export default App;
