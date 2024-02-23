import React, { useRef, useState } from 'react'
// CSS
import "./AddPost.css";
import { usePostsContext } from '../../PostsContext/PostsContext';


export default function AddPost() {
    // posts context
    const {addPosts} = usePostsContext();
    // error state
    const [error, setError] = useState(false);

    // newPost state
    const [newPost, setNewPost] = useState({ title: "", description: "", tag: ""})
    
    // handle submission
    const handleSubmit = (e) => {

        e.preventDefault();
        if (!newPost.title || !newPost.description || !newPost.tag) {
            setError(true);
        } else {
            // add the posts
            addPosts(newPost, setError);
            setNewPost({title: "", description: "", tag: ""});
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
            <button type="submit" className="btn btn-submit">Submit</button>
        </form>
    </div>
  )
} 
