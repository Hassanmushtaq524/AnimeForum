import React, { useEffect } from 'react';
// components
import Posts from '../../components/Posts/Posts.js';
import SideBar from '../../components/SideBar/SideBar.js';
// CSS
import "./Home.css";
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state/index.js';
// Global State

const Home = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllPosts();
    }, [])

    // fetch all the posts
    const fetchAllPosts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/posts/", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
            // check for status ok
            if (response.ok) {
                const json = await response.json();
                if (!json.error) {
                    const payload = {
                        posts: json.postsArr
                    }
                    dispatch(setPosts(payload))
                }
            } else {
                dispatch(setPosts([]));
            }
        } catch (error) {
            dispatch(setPosts([]));
        }
    };

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