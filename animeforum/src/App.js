// CSS
import "./App.css";
// components
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import  PostsProvider  from "./PostsContext/PostsContext";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <PostsProvider>
        <Navbar />
        <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </PostsProvider>
    </>
  );
}

export default App;
