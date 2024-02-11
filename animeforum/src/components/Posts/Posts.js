import React, { useContext, useEffect } from 'react'

// CSS
import "./Posts.css";
// components
import Post from "../Post/Post.js";
import { usePostsContext } from '../../PostsContext/PostsContext.js';

export default function Posts() {
    const {posts, fetchAllPosts} = usePostsContext();

    useEffect(() => {
        fetchAllPosts();
    },[]);

    return (
        <>
        <div id="posts">
            <div className="posts-heading">
                <h2>Recent posts</h2>
            </div>
            <div className="all-posts">
                {posts.map((val, i, postsArr) => {
                    return (
                        <Post key={postsArr[postsArr.length - 1 - i]._id} 
                        title={postsArr[postsArr.length - 1 - i].title} 
                        description={postsArr[postsArr.length - 1 - i].description} 
                        userName={postsArr[postsArr.length - 1 - i].user.name} 
                        date={postsArr[postsArr.length - 1 - i].date} 
                        likes={postsArr[postsArr.length - 1 - i].likes}/>
                    )
                })}
            </div>
        </div>
        </>
    )
}
