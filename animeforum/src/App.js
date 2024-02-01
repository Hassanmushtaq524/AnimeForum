// CSS
import "./App.css";
// components
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
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
        </Routes>
    </PostsProvider>
    </>
  );
}

export default App;
