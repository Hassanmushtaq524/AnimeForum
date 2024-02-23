import React, { useEffect } from 'react';
// components
import Posts from '../../components/Posts/Posts.js';
import SideBar from '../../components/SideBar/SideBar.js';
// CSS
import "./Home.css";
import { usePostsContext } from '../../PostsContext/PostsContext.js';
const Home = () => {
    
    const { posts, fetchAllPosts } = usePostsContext();

    return (
        <>
        <div className="home">
            <SideBar/>
            <Posts fetchFunction={fetchAllPosts} posts={posts} title={"For You"}/>
        </div>
        </>
    )
}

export default Home;