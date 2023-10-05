import React from "react";
import "./stylesheets/Navbar.css";


const Navbar = () => {
    
    return (
        <div className="container navbar my-5">
            <h3 className="navbar-heading">AnimeForum</h3>
            <nav className="navbar-items">
                <a href="#" className="navbar-item">Home</a>
                <a href="#" className="navbar-item">About</a>
                <a href="#" className="navbar-item">Contact</a>
            </nav>
        </div>
    )
}

export default Navbar;