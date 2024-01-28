import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";

const Navbar = () => {
    
    return (
        <>
        <div className="navbar">
            <span className="logo">AnimeForum!</span>
            <div className="nav-items">
                <Link className="nav-link" to={"/"}>Home</Link>
                <Link className="nav-link" to={"/"}>About</Link>
                <Link className="nav-link" to={"/"}>Contact</Link>
            </div>
        </div>

        </>
    )
}

export default Navbar;