import React, { useEffect } from 'react';
// components
import Posts from '../../components/Posts/Posts.js';
import SideBar from '../../components/SideBar/SideBar.js';
// Redux
import { fetchAllPosts } from '../../features/postSlice.js';
import { useDispatch } from 'react-redux';
// CSS
import "./Home.css";
const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [])

    return (
        <>
        <div className="home">
            <SideBar/>
            <Posts title={"All Posts"}/>
        </div>
        </>
    )
}

export default Home;