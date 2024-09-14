import React, { useContext } from "react";
import "./Navbar.css"

// components
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // handle logout functionality
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <>
        <div className="navbar">
            <span className="logo">AnimeForum!</span>
            <div className="nav-items">
                <Link className="nav-link" to={"/"}>Home</Link>
                { user ? 
                <Link className="nav-link" to={"/profile"}>My Profile</Link> :
                <></> }
                { user ? 
                <Link onClick={handleLogout} className="nav-link" to={"/login"}>Logout</Link> : 
                <Link className="nav-link" to={"/login"}>Login</Link>}
                { user ? 
                 <></> : 
                <Link className="nav-link" to={"/signup"}>Signup</Link>}
                {user && <Link className="nav-link" to={"/"}>Welcome Back, {user.firstName}</Link>}
            </div>
        </div>

        </>
    )
}

export default Navbar;