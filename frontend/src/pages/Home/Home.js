import React, { useEffect } from 'react';
// components
import Posts from '../../components/Posts/Posts.js';
import SideBar from '../../components/SideBar/SideBar.js';
import AddPost from '../../components/AddPost/AddPost.js';
// Redux
import { fetchAllPosts } from '../../features/postSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 * Home Page
 */
const Home = () => {
    /**
     * Redux
     */
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    /**
     * Hooks
     */
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [])

    return (
        <>
        <div id="home"
             className="flex flex-wrap h-full gap-x-6 p-6 justify-center">
            <Posts/>
            { (user) ? <AddPost/> :  
            <div className="btn-containe 
                            flex flex-col gap-y-4 border-1 border-secondary rounded-xl p-4 h-fit w-96 items-center">
                <button type="submit" className="btn btn-submit" onClick={() => navigate('/login')}>Login</button>
                <h5>OR</h5>
                <button type="submit" className="btn btn-submit" onClick={() => navigate('/signup')}>Signup</button>
            </div> }
        </div>
        </>
    )
}

export default Home;