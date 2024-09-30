import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../features/postSlice';

function AddComment(props) {
    /**
     * Redux
     */
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    
    /**
     * State
     */
    const [newComment, setNewComment] = useState({ text: "" });

    /**
     * Post Id
     */
    const { _id } = props;

    /**
     * Send the comment
     */
    const handleSubmit = (e) => {
        e.preventDefault()
        if (user) {
            dispatch(addComment({ comment: newComment, _id, token }))
        }
        setNewComment({ text: "" });
        return;
    }

    const handleChange = (e) => {
        setNewComment({...newComment, [e.target.name]: e.target.value});
    }

    return (
        <div id="add-comment" className="secondary-box">
            <form className="add-comment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea type="text" onChange={handleChange} value={newComment.text} name="text" className="form-control" placeholder="Enter Text"/>
                </div>
                <button type="submit" className="btn btn-submit">+ Add comment</button>
            </form>
        </div>
    )
}

export default AddComment