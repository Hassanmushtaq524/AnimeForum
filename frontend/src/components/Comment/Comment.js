import React from 'react'
// css
import "./Comment.css";

function Comment(props) {
    const { text, userId, userName, date } = props;

    return (
        <div className="comment">
            <h6>{text}</h6>
            <div className="bottom-wrapper">    
                <p>By: {userName}</p>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default Comment