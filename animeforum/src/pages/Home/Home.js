import React from 'react';
// components
import Posts from '../../components/Posts/Posts.js';
import AddPost from '../../components/AddPost/AddPost.js';

// CSS
import "./Home.css";
const Home = () => {
    return (
        <div className="home">
            <h2>Add a new post</h2>
            <AddPost/>
            <h2>Posts</h2>
            <Posts/>
        </div>
    )
}

export default Home;