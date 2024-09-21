import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import "./AddComment.css";

function AddComment() {
    /**
     * Redux
     */
    const { user, token } = useSelector((state) => state.auth);
    const [newComment, setNewComment] = useState({ text: "" });

    /**
     * Send the comment
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        return;
    }

    const handleChange = (e) => {
        setNewComment({...newComment, [e.target.name]: e.target.value});
    }

    return (
        <div id="add-comment">
            <h4>Add a new comment</h4>
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label><h6>Title</h6></label>
                    <input type="text" onChange={handleChange} value={newComment.text} name="text" className="form-control" placeholder="Enter Text"/>
                </div>
                <button type="submit" className="btn btn-submit">Submit</button>
            </form>
        </div>
    )
}

export default AddComment