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
        <div id="navbar " 
             className="h-screen w-40 p-8 d-flex bg-primary flex flex-col gap-y-40">
            <img src={logo}/>
            <div className="nav-items
                            flex flex-col text-center gap-y-20">
                <Link className="nav-link font-bungee text-white hover:text-secondary" to={"/"}>Home</Link>
                { user ? 
                <Link className="nav-link font-bungee text-white hover:text-secondary" to={`/profile/${user._id}`}>My Profile</Link> :
                <></> }
                { user ? 
                <Link onClick={handleLogout} className="nav-link font-bungee text-white hover:text-secondary" to={"/login"}>Logout</Link> : 
                <Link className="nav-link font-bungee text-white hover:text-secondary" to={"/login"}>Login</Link>}
                { user ? 
                 <></> : 
                <Link className="nav-link font-bungee text-white hover:text-secondary" to={"/signup"}>Signup</Link>}
                {user && <Link className="nav-link font-bungee text-white hover:text-secondary" to={"/"}>Welcome Back, {user.userName}</Link>}
            </div>
        </div>
        </>
    )
}

export default Navbar;