import React, { useEffect } from 'react'
import PostDetail from '../../components/PostDetail/PostDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../features/postSlice';
import "./PostPage.css";
import AddComment from '../../components/AddComment/AddComment';


function PostPage() {
  /**
   * Redux
   */
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Params
   */
  const { _id } = useParams();

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [])



  return (
    <div id="post-page">
      <PostDetail _id={_id}/>
      { (user) ? <AddComment _id={_id}/> :  
        <div className="btn-container">
            <button type="submit" className="btn btn-submit" onClick={() => navigate('/login')}>Login</button>
            <h5>OR</h5>
            <button type="submit" className="btn btn-submit" onClick={() => navigate('/signup')}>Signup</button>
        </div> } 
      {/* TODO: Comments page */}
    </div>
  )
}

export default PostPage