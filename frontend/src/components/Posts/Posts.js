import React from 'react'

// CSS
import "./Posts.css";
// components
import Post from "../Post/Post.js";
// Redux
import { useSelector } from 'react-redux';


export default function Posts(props) {
    const { title } = props;
    const { posts, status, error } = useSelector((state) => state.post);

    return (
        <>
        <div id="posts">
            <div className="posts-heading">
                <h2>{title}</h2>
            </div>
            <div className="all-posts">
                { posts.length ? 
                    posts.map((val, i, posts) => {
                        return (
                            <Post key={posts[posts.length - 1 - i]._id}
                            _id = {posts[posts.length - 1 - i]._id} 
                            title = {posts[posts.length - 1 - i].title} 
                            description = {posts[posts.length - 1 - i].description} 
                            userName = {posts[posts.length - 1 - i].user.userName} 
                            date = {posts[posts.length - 1 - i].date.slice(0, 10)} 
                            likes = {posts[posts.length - 1 - i].likes}/>
                        )
                    })
                :
                    (error) ? <p>Error displaying posts</p> : <p>Nothing to display...</p>
                }
            </div>
        </div>
        </>
    )
}
