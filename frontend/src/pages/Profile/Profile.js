import React, { useEffect, useState } from 'react'
// components
import Posts from "../../components/Posts/Posts.js";
// CSS
import "./Profile.css"
import { useNavigate, useParams } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikePosts, fetchUserPosts } from '../../features/postSlice.js';
import { logout } from '../../features/authSlice.js';

export default function Profile() {
    /**
     * Current auth user
     */
    const { user, status, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    /**
     * Params to get the id
     */
    const { _id } = useParams();

    /** 
     * Posts selected state
     * */ 
    const [selected, setSelected] = useState("Posts");   
    
    /**
     * Use navigatte
     */
    let navigate = useNavigate();
    
    useEffect(() => {
        // TODO: we need to make it so we can access other people's profile but cannot change
        // their posts
        // When you go to user page using the _id, we have to check from useParams if the 
        // user._id is the one that is autheticated. 
        switch (selected) {
            case "Posts":
                dispatch(fetchUserPosts(_id))
                break;
            case "Liked":
                dispatch(fetchLikePosts(_id))
        }

    }, []);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <div id="profile">
            <div className="select-bar">
                <h3
                 style={ selected === "Posts" ? {color: "#ee7752"} : {color: "black"} }
                 onClick={() => setSelected("Posts")}>Posts</h3>
                <h3 
                 style={ selected === "Liked" ? {color: "#ee7752"} : {color: "black"} }
                 onClick={() => setSelected("Liked")}>Liked Posts</h3>
                <h3 onClick={handleLogout}>Logout</h3>
            </div>
            {
                selected === "Posts" ? 
                <Posts title={selected} />
                :
                <Posts title={selected}/>
            }
        </div>
    )
}
