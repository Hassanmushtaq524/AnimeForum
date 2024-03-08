import React, { useEffect } from 'react'

// CSS
import "./Posts.css";
// components
import Post from "../Post/Post.js";
// Global state
import { useSelector } from 'react-redux';

export default function Posts(props) {
    // props
    const { title } = props;
    // global state
    const posts = useSelector((globalState) => globalState.posts);

    useEffect(() => {

    }, [])

    return (
        <>
        <div id="posts" className="box">
            
            { posts && posts.length ? 
                posts.map((val, i, postsArr) => {
                    return (
                        <Post key={postsArr[postsArr.length - 1 - i]._id}
                        postId = {postsArr[postsArr.length - 1 - i]._id} 
                        title = {postsArr[postsArr.length - 1 - i].title} 
                        description = {postsArr[postsArr.length - 1 - i].description} 
                        userName = {postsArr[postsArr.length - 1 - i].user.firstName} 
                        date = {postsArr[postsArr.length - 1 - i].date.slice(0, 10)} 
                        likes = {postsArr[postsArr.length - 1 - i].likes}/>
                    )
                })
            :
                <p>Nothing to display...</p>
            }

        </div>
        </>
    )
}
