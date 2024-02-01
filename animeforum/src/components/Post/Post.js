import React from "react";
// CSS
import "./Post.css";
export default function Post(props) {
  const { title, description, userName, date, likes } = props;

  return (
    <div className="post">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="bottom-wrapper">
            <p>By {userName}</p>
         
            <p>Date Posted: {date}</p>  
        </div>
    </div>
  );
}
