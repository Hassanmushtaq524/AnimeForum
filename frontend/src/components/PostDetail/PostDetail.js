import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, deletePost } from "../../features/postSlice";
import { Link, useNavigate } from 'react-router-dom';
import deleteIcon from "../../assets/icons8-delete.svg";

export default function PostDetail(props) {
    /**
     * Post id
     */
    const { _id } = props;
    
    /**
     * Redux
     */
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /**
     * Get post
     */
    const posts = useSelector((state) => state.post.posts);
    const post = posts?.find((post) => post._id === _id);

    /**
     * Liked and authUser state
    */
   const [liked, setLiked] = useState(false);
   const [authUser, setAuthUser] = useState(false);
   const navigate = useNavigate();


   
    /**
    * Set liked
    */
    useEffect(() => {
        setLiked(post?.likes.hasOwnProperty(user?._id));
        setAuthUser(post?.user._id === user?._id);
    }, [])

    /**
     * Handle like
     */
    const handleLike = (e) => {
        /**
         * Prevents us from going to the post page
         */
        e.stopPropagation();

        if (!user) {
            // TODO: probably have an overlay that says u need to login
            navigate('/login');
            setLiked(false);
            return;
        }
        setLiked(!liked);
        dispatch(likePost({_id, token}));
    }


    /**
     * Put date in the correct format
     */
    const parseDate = (date) => {
        date = date.slice(0, 10);
        return `${date.slice(5,7)}/${date.slice(8)}/${date.slice(0,4)}`;
    }

    /** 
     * Handle delete
     */
    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deletePost({_id, token}));
        navigate("/")
    }

    return (
        <div className="post-detail secondary-box">
            <h3>{post?.title}</h3>
            <p>{post?.description}</p>
            <div className="bottom-wrapper">
                <div className="link-container">
                    <p><Link onClick={(e) => e.stopPropagation()} to={`/profile/${post?.user._id}`} className="link">{post?.user.userName}</Link></p>
                </div>
                <div className="likes-container" style={{ display: "flex", gap: "10px"}}>
                    <p>
                        <svg onClick={handleLike} className={`heart-icon ${liked ? "heart-icon-liked": ""}`} width="20px" height="20px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75&#xA;&#x9;C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z"/>
                        </svg>
                    </p>
                    <h6>{Object.keys(post?.likes).length}</h6>
                </div>
                <div className="date-container">
                    <p className="date">{parseDate(post?.date)}</p>  
                </div>
                {authUser && 
                <div className="delete-container">
                    <img onClick={handleDelete} src={deleteIcon}/>
                </div>}
            </div>
        </div>
    );
}

