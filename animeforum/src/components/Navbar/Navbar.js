import React from "react";
import "./Navbar.css"

// components
import { Link } from "react-router-dom";

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
    }

    return (
        <>
        <div key={localStorage.getItem("token")} className="navbar">
            <span className="logo">AnimeForum!</span>
            <div className="nav-items">
                <Link className="nav-link" to={"/"}>Home</Link>
                <Link className="nav-link" to={"/"}>My Posts</Link>
                { localStorage.getItem("token") ? 
                <Link onClick={handleLogout} className="nav-link" to={"/login"}>Logout</Link> : <Link className="nav-link" to={"/login"}>Login</Link>}
                
            </div>
        </div>

        </>
    )
}

export default Navbar;