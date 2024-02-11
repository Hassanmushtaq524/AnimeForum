import React from "react";
// CSS
import "./Post.css";
export default function Post(props) {
    const { title, description, userName, date, likes } = props;

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
                <p>Likes: {likes.length}</p>
                <p>Date Posted: {date}</p>  
            </div>
        </div>
    );
}

