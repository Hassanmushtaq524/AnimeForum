import React, { useEffect } from 'react'

// components
import Post from "../Post/Post.js";
// Redux
import { useSelector } from 'react-redux';
import constants from '../../constants/constants.js';


export default function Posts(props) {
    /**
     * Redux
     */
    const { user } = useSelector((state) => state.auth); 
    const { posts, status } = useSelector((state) => state.post);
    const { title } = props;

    return (
        <>
        <div id="posts" 
            className="border-solid border-1 border-secondary rounded-xl
                       p-8 
                       h-full 
                       overflow-y-scroll 
                       w-[600px] no-scrollbar">
            <div className="all-posts flex flex-col gap-y-4">
                { posts?.length ? 
                    posts.map((val, i, posts) => {
                        return (
                            <Post key={posts[posts.length - 1 - i]._id}
                            _id = {posts[posts.length - 1 - i]._id} 
                            title = {posts[posts.length - 1 - i].title} 
                            description = {posts[posts.length - 1 - i].description} 
                            userName = {posts[posts.length - 1 - i].user.userName}
                            userId = {posts[posts.length - 1 - i].user._id}
                            authUser = {posts[posts.length - 1 - i].user._id === user?._id}
                            date = {posts[posts.length - 1 - i].date} 
                            likes = {posts[posts.length - 1 - i].likes}/>
                        )
                    })
                :
                    (status === constants.STATUS_PENDING) ? <p>Loading...</p> : <p>Nothing to display...</p>
                }
            </div>
        </div>
        </>
    )
}
