import React, { useEffect, useState } from "react";
// CSS
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";


export default function Post(props) {
    // get props
    const { postId, title, description, userName, date, likes } = props;
    // global state
    const dispatch = useDispatch();
    const user = useSelector((globalState) => globalState.user);

    useEffect(() => {

    }, []);
    



    // liking the current post
    const likePost = async () => {
        
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
        <div className="post box">
            <h3>{title}</h3>
            <p>{parseDescription(description)}</p>
            <div className="bottom-wrapper">
                <p>{userName}</p>
                <p><svg onClick={() => likePost()} className={`heart-icon ${likes[user.id] ? "heart-icon-liked": ""}`} width="20px" height="20px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75&#xA;&#x9;C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z"/>
                </svg>
                {Object.keys(likes).length}</p>
                <p>{date}</p>  
            </div>
        </div>
    );
}

