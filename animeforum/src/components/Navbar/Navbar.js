import React, { useContext } from "react";
import "./Navbar.css"

// components
import { Link } from "react-router-dom";
import { useAuth } from "../../PostsContext/AuthContext";

const Navbar = () => {
    // AuthContext
    const { user, auth, logoutUser } = useAuth();

    // handle logout functionality
    const handleLogout = () => {
        logoutUser();
    }

    return (
        <>
        <div className="navbar">
            <span className="logo">AnimeForum!</span>
            <div className="nav-items">
                <Link className="nav-link" to={"/"}>Home</Link>
                <Link className="nav-link" to={"/"}>My Posts</Link>
                { auth ? 
                <Link onClick={handleLogout} className="nav-link" to={"/login"}>Logout</Link> : 
                <Link className="nav-link" to={"/login"}>Login</Link>}
                { auth ? 
                 <></> : 
                <Link className="nav-link" to={"/signup"}>Signup</Link>}
                {user.name && <Link className="nav-link" to={"/"}>Welcome Back, {user.name}</Link>}
            </div>
        </div>

        </>
    )
}

export default Navbar;