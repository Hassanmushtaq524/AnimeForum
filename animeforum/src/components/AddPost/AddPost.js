import React, { useRef } from 'react'
// CSS
import "./AddPost.css";
export default function AddPost() {
    const formRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {};
        newPost.text = formRef.current.text.value;
        newPost.description = formRef.current.description.value;
        newPost.tag = formRef.current.tag.value;
        console.log(newPost);
    }
  return (
    <div id="addPosts">
        <h4>Add a new post</h4>
        <form className="addPosts-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" name="text" className="form-control" placeholder="Enter Title"/>
            </div>
            <div className="form-group">
                <textarea class="form-control" name="description" placeholder="Enter Description" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="form-group">
                <input type="text" name="tag" className="form-control" placeholder="Enter Tag"/>
            </div>
            <button type="submit" className="btn btn-submit">Submit</button>
        </form>
    </div>
  )
} 
