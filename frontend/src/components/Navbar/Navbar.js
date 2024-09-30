import React, { useContext } from "react";

// components
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authSlice";

import logo from "../../assets/logo.svg";

const Navbar = () => {
    /**
     * Redux
     */
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    /**
     * Logout handler
     */
    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <>
        <div className="navbar">
            <img src={logo}/>
            <div className="nav-items">
                <Link className="nav-link" to={"/"}>Home</Link>
                { user ? 
                <Link className="nav-link" to={`/profile/${user._id}`}>My Profile</Link> :
                <></> }
                { user ? 
                <Link onClick={handleLogout} className="nav-link" to={"/login"}>Logout</Link> : 
                <Link className="nav-link" to={"/login"}>Login</Link>}
                { user ? 
                 <></> : 
                <Link className="nav-link" to={"/signup"}>Signup</Link>}
                {user && <Link className="nav-link" to={"/"}>Welcome Back, {user.userName}</Link>}
            </div>
        </div>
        </>
    )
}

export default Navbar;