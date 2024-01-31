import React from 'react';
// components
import Posts from '../../components/Posts/Posts.js';
import SideBar from '../../components/SideBar/SideBar.js';

// CSS
import "./Home.css";
const Home = () => {
    return (
        <>
        <div className="home">
            <SideBar/>
            <Posts/>
        </div>
        </>
    )
}

export default Home;