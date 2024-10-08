import React, { useEffect } from 'react'
import PostDetail from '../../components/PostDetail/PostDetail'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../../features/postSlice';
import AddComment from '../../components/AddComment/AddComment';
import Comments from '../../components/Comments/Comments';


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
    <div id="post-page"
         className="h-screen w-full 
                    p-6
                    flex flex-col justify-start gap-y-12 
                    overflow-y-scroll">
      <PostDetail _id={_id}/>
      { (user) ? <AddComment _id={_id}/> :  
        <div className="btn-container
                        flex flex-col gap-y-4 border-1 border-secondary rounded-xl p-4 h-fit w-96 items-center">
            <button type="submit" className="btn btn-submit" onClick={() => navigate('/login')}>Login</button>
            <h5>OR</h5>
            <button type="submit" className="btn btn-submit" onClick={() => navigate('/signup')}>Signup</button>
        </div> } 
      <Comments _id={_id}/>
    </div>
  )
}

export default PostPage