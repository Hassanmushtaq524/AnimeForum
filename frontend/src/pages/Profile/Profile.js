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
        <div id="profile"
             className="flex flex-wrap h-full gap-x-12 p-6 justify-center">
            <div className="select-bar 
                            h-fit 
                            border-1 border-primary rounded-xl
                            p-6
                            flex flex-col justify-center items-center gap-y-12">
                <h4
                    // style={ selected === "Posts" ? {color: "#ee7752"} : {color: "black"} }
                    className={selected === "Posts" ? "text-primary" : "text-secondary hover:text-primary"}
                    style={{cursor: "pointer"}}
                    onClick={() => setSelected("Posts")}>
                    Posts
                </h4>
                <h4 
                    className={selected === "Liked" ? "text-primary" : "text-secondary hover:text-primary"}
                    style={{cursor: "pointer"}}
                    onClick={() => setSelected("Liked")}>
                    Liked Posts
                </h4>
                {authUser && <h4 style={{cursor: "pointer"}} className="text-secondary hover:text-primary" onClick={handleLogout}>Logout</h4>}
            </div>
            <Posts/>
        </div>
    )
}
