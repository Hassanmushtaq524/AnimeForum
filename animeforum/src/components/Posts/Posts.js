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
        // console.log(posts);
        // eslint-disable-next-line
    }, []);
    return (
        <>
        <div id="posts">
            <div className="posts-heading">
                <h2>Posts</h2>
            </div>
            <div className="all-posts">
                {posts.map((post) => {
                    return (
                        <Post title={post.title} description={post.description} userName={post.user.name} date={post.date}/>
                    )
                })}
            </div>
        </div>
        </>
    )
}
