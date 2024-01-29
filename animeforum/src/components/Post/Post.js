import React from 'react'
// CSS 
import "./Post.css";
export default function Post(props) {
    const { title, description, userName, date } = props; 

    return (
        <div className="post">
            <h3>{title}</h3>
            <p>{description}</p>

        </div>
    )
}
