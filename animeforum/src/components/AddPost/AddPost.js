import React, { useState } from 'react'
// CSS
import "./AddPost.css";
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from "../../state";

export default function AddPost() {
    // posts context
    const dispatch = useDispatch();
    const postsArr  = useSelector((globalState) => globalState.posts);

    // error state
    const [error, setError] = useState(false);
    // newPost state
    const [newPost, setNewPost] = useState({ title: "", description: "", tag: "", picturePath: ""})
    
    // handle submission
    const handleSubmit = (e) => {

        e.preventDefault();
        if (!newPost.title || !newPost.description || !newPost.tag) {
            setError(true);
        } else {
            // add the posts
            addPost(newPost);
            setNewPost({title: "", description: "", tag: "", picturePath: ""});
        }

    }

    // add the post
    const addPost = async (newPost) => {
        try {
            // send the new post
            let response = await fetch("http://localhost:5000/api/posts/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                },
                body: JSON.stringify(newPost)
            });

            if (response.ok) {
                const data = response.json();
                // create payload
                let payload = {
                    posts: postsArr.concat(data.post)
                }
                // dispatch
                dispatch(setPosts(payload))
    
                // set error
                setError(false)
            } else {
                setError(true)
            }

        } catch (error) {
            setError(true)
        }
    }


    // change newPost state
    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.name]: e.target.value});
    }

  return (
    <div id="addPosts">
        <h4>Add a new post</h4>
        <form className="addPosts-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label><h6>Title</h6></label>
                <input type="text" onChange={handleChange} value={newPost.title} name="title" className="form-control" placeholder="Enter Title"/>
            </div>
            <div className="form-group">
                <label><h6>Description</h6></label>
                <textarea class="form-control" onChange={handleChange} value={newPost.description} name="description" placeholder="Enter Description" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="form-group">
                <label><h6>Tag</h6></label>
                <input type="text" onChange={handleChange} value={newPost.tag} name="tag" className="form-control" placeholder="Enter Tag"/>
            </div>
            <p style={(error) ? {visibility: "visible", color: "red"} : {visibility: "collapse"}}>Please enter a valid post</p>
            <button type="submit" className="btn">Submit</button>
        </form>
    </div>
  )
} 
