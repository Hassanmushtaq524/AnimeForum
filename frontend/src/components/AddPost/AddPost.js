import React, { useEffect, useRef, useState, memo } from 'react'
// CSS
import "./AddPost.css";
import { useDispatch, useSelector } from 'react-redux';
import { addPost, setError } from '../../features/postSlice';

/**
 * AddPost component
 */
function AddPost() {
    /**
     * Redux
     */
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /**
     * New post state
     * Error state
     */
    const [newPost, setNewPost] = useState({ title: "", description: "", tag: ""})
    const [error, setError] = useState(false);

    /**
     * Handle submission
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newPost.title || !newPost.description || !newPost.tag) {
            setError(true);
            return;
        }
        setError(false);
        setNewPost({ title: "", description: "", tag: ""});
        dispatch(addPost({ post: newPost, token }));
    }

    /**
     * Handle change for new post
     */
    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.name]: e.target.value});
    }

    return (
        <div id="addPosts">
            <form className="addPosts-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label><h6>Title</h6></label>
                    <input type="text" onChange={handleChange} value={newPost.title} name="title" className="form-control" placeholder="Enter Title"/>
                </div>
                <div className="form-group">
                    <label><h6>Description</h6></label>
                    <textarea className="form-control" onChange={handleChange} value={newPost.description} name="description" placeholder="Enter Description" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="form-group">
                    <label><h6>Tag</h6></label>
                    <input type="text" onChange={handleChange} value={newPost.tag} name="tag" className="form-control" placeholder="Enter Tag"/>
                </div>
                <p style={(error) ? {visibility: "visible", color: "red"} : {visibility: "collapse"}}>Please enter a valid post</p>
                <button type="submit" className="btn btn-submit">+ Add Post</button>
            </form>
        </div>
  )
} 

export default AddPost;
