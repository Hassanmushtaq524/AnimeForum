import React, { useEffect, useState } from 'react'
// components
import Posts from "../../components/Posts/Posts.js";
import { useNavigate, useParams } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchLikedPosts, fetchUserPosts } from '../../features/postSlice.js';
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
    const [authUser, setAuthUser] = useState(false);
    
    /**
     * Use navigatte
     */
    let navigate = useNavigate();
    
    useEffect(() => {
        setAuthUser(_id === user?._id);

        switch (selected) {
            case "Posts":
                dispatch(fetchUserPosts(_id));
                break;
            case "Liked":
                dispatch(fetchLikedPosts(_id));
                break;
        }

    }, [selected, _id]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
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
                {authUser && <h3 onClick={handleLogout}>Logout</h3>}
            </div>
            <Posts title={selected}/>
        </div>
    )
}
