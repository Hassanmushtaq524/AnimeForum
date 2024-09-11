import React from "react";
// CSS
import "./Navbar.css"
// components
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../features";
// assets
import logo from "../../assets/logo.svg";


const Navbar = () => {
    const dispatch = useDispatch();
    const user = useSelector((globalState) => globalState.user);

    // handle logout functionality
    const handleLogout = () => {
        dispatch(setLogout());
    }

    return (
        <>
        <div className="navbar">
            <img className="logo" src={logo} alt="Logo" />
            <div className="nav-items">
                <Link className="nav-link" to={"/"}>Home</Link>
                { user ? 
                <Link className="nav-link" to={"/profile"}>My Profile</Link> :
                <></> }
                { user ? 
                <Link onClick={handleLogout} className="nav-link" to={"/login"}>Logout</Link> : 
                <Link className="nav-link" to={"/login"}>Login</Link>}
                { !user && 
                <Link className="nav-link" to={"/signup"}>Signup</Link>}
                {user && <Link className="nav-link" to={"/"}>Welcome Back, {user.firstName}</Link>}
            </div>
        </div>

        </>
    )
}

export default Navbar;