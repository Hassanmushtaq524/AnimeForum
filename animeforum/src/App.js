// CSS
import "./App.css";
// components
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import AuthProvider from "./PostsContext/AuthContext";
import  PostsProvider  from "./PostsContext/PostsContext";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <AuthProvider>
    <PostsProvider>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </PostsProvider>
    </AuthProvider>
    </>
  );
}

export default App;
