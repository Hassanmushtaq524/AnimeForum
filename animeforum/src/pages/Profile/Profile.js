import React, { useEffect, useState } from 'react'
// components
import Posts from "../../components/Posts/Posts.js";
// CSS
import "./Profile.css"
import { useNavigate } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyPosts, fetchLikePosts } from '../../features/postSlice.js';
import { logout } from '../../features/authSlice.js';

export default function Profile() {

    // select state
    const [selected, setSelected] = useState("My Posts");   
    const { user, status, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    // navigate
    let navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            switch (selected) {
                case "My Posts":
                    dispatch(fetchMyPosts());
                    break;
                case "Liked":
                    dispatch(fetchLikePosts());
                    break;
            }
        }

    }, []);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div id="profile">
            <div className="select-bar">
                <h3
                 style={ selected === "My Posts" ? {color: "#ee7752"} : {color: "black"} }
                 onClick={() => setSelected("My Posts")}>My Posts</h3>
                <h3 
                 style={ selected === "Liked" ? {color: "#ee7752"} : {color: "black"} }
                 onClick={() => setSelected("Liked")}>Liked Posts</h3>
                <h3 onClick={handleLogout}>Logout</h3>
            </div>
            {
                selected === "My Posts" ? 
                <Posts title={selected}/>
                :
                <Posts title={selected}/>
            }
        </div>
    )
}
