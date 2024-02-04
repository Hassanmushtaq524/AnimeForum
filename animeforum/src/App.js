// CSS
import "./App.css";
// components
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
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
        </Routes>
    </PostsProvider>
    </AuthProvider>
    </>
  );
}

export default App;
