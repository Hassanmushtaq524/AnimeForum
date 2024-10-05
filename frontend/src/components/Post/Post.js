import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likePost, deletePost } from "../../features/postSlice";
import { Link, useNavigate } from 'react-router-dom';
import deleteIcon from "../../assets/icons8-delete.svg";

export default function Post(props) {
    /**
     * Redux
     */
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /**
     * Props
     */
    const { _id, title, description, userName, userId, date, likes, authUser } = props;

    /**
     * Liked state
     */
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    /**
     * Check if current post is liked
     */
    useEffect(() => {
        setLiked(likes.hasOwnProperty(user?._id));
    }, [])

    /**
     * limit the description words to display only 50
     */   
    const parseDescription = (description) => {
        let temp = description.split(" ");
        if (temp.length > 50) {
            description = "";
            for (let i = 0; i < 50; i++) {
                description += temp[i] + " ";
            }
            description += ". . .";
        }
        return description;
    }

    /**
     * Put date in the correct format
     */
    const parseDate = (date) => {
        date = date.slice(0, 10);
        return `${date.slice(5,7)}/${date.slice(8)}/${date.slice(0,4)}`;
    }

    
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
     * Handle delete
     */

    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deletePost({_id, token}));
    }

    /**
     * Handle update
     */


    return (
        <div className="post primary-box
                        border-solid border-1 border-primary p-8 rounded-xl flex flex-col gap-y-4 max-w-xl h-fit text-wrap overflow-hidden" 
             onClick={() => navigate(`/post/${_id}`)}>
            <h3>{title}</h3>
            <p>{parseDescription(description)}</p>
            <div className="bottom-wrapper grid grid-cols-2 gap-y-3">
                <div className="link-container">
                    <p><Link onClick={(e) => e.stopPropagation()} to={`/profile/${userId}`} className="link">{userName}</Link></p>
                </div>
                <div className="likes-container flex items-center justify-self-end" style={{ display: "flex", gap: "10px"}}>
                    <p>
                        <svg onClick={handleLike} className={`heart-icon ${liked ? "fill-primary": "fill-none stroke-primary"} hover:fill-primary`} width="20px" height="20px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75&#xA;&#x9;C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z"/>
                        </svg>
                    </p>
                    <h6>{Object.keys(likes).length}</h6>
                </div>
                <div className="date-container">
                    <p className="date font-interRegular text-darkGray text-xs">{parseDate(date)}</p>  
                </div>
                {authUser && 
                <div className="delete-container justify-self-end">
                    <img onClick={handleDelete} src={deleteIcon}/>
                </div>}
            </div>
        </div>
    );
}

