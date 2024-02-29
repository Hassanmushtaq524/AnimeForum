import React, { useEffect, useState } from "react";
// CSS
import "./Post.css";
import { usePostsContext } from "../../PostsContext/PostsContext";
import { useAuth } from "../../PostsContext/AuthContext";


export default function Post(props) {
    // get props
    const { postId, title, description, userName, date, likes } = props;
    
    // liked state
    const [liked, setLiked] = useState(false);
    // posts context
    const {likePost} = usePostsContext();
    // auth context
    const { user, auth } = useAuth();

    
    useEffect(() => {
        if (auth) {
            setLiked(isLiked());
        }
    }, []);
    
    // return true if the post is already liked by current user
    const isLiked = () => {
        console.log(user.likes);
        if (user.likes.indexOf(postId) >= 0) {
            return true;
        } else {
            return false;
        }
    }
    
    // handle liking of the post
    const handleLike = () => {
        if (!liked) {
            likePost(postId)
            setLiked(true);
        }
    }

    // limit the description words to display only 50   
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
    
    return (
        <div className="post">
            <h3>{title}</h3>
            <p>{parseDescription(description)}</p>
            <div className="bottom-wrapper">
                <p>By: {userName}</p>
                <p><svg onClick={handleLike} className={`heart-icon ${liked ? "heart-icon-liked": ""}`} width="20px" height="20px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75&#xA;&#x9;C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z"/>
                </svg>
                {likes.length}</p>
                <p>Date Posted: {date}</p>  
            </div>
        </div>
    );
}

