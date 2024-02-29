import React, { useEffect, useState } from 'react'
// components
import Posts from "../../components/Posts/Posts.js";
// CSS
import "./Profile.css"
import { usePostsContext } from '../../PostsContext/PostsContext.js';
import { useAuth } from '../../PostsContext/AuthContext.js';
import { useNavigate } from 'react-router-dom';


export default function Profile() {

    // select state
    const [selected, setSelected] = useState("My Posts");
    // posts context
    const { posts, fetchMyPosts, fetchLikedPosts } = usePostsContext();
    // auth context 
    const { auth, logoutUser } = useAuth();
    // navigate
    let navigate = useNavigate();
    
    useEffect(() => {
        if (!auth) {
            navigate("/login");
        }

    }, [auth])

    return (
        <div id="profile">
            <div className="select-bar">
                <h3
                 style={ selected === "My Posts" ? {color: "#ee7752"} : {color: "black"} }
                 onClick={() => setSelected("My Posts")}>My Posts</h3>
                <h3 
                 style={ selected === "Liked" ? {color: "#ee7752"} : {color: "black"} }
                 onClick={() => setSelected("Liked")}>Liked Posts</h3>
                <h3 onClick={() => logoutUser()}>Logout</h3>
            </div>
            {
                selected === "My Posts" ? 
                <Posts posts={posts} fetchFunction={fetchMyPosts} title={selected}/>
                :
                <Posts posts={posts} fetchFunction={fetchLikedPosts} title={selected}/>
            }
        </div>
    )
}
