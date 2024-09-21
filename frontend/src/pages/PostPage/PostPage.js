import React, { useEffect } from 'react'
import PostDetail from '../../components/PostDetail/PostDetail'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { fetchAllPosts } from '../../features/postSlice';
import "./PostPage.css";
import AddComment from '../../components/AddComment/AddComment';


function PostPage() {
  /**
   * Redux
   */

  const dispatch = useDispatch();

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
      <AddComment/>
      {/* TODO: Comments page */}
    </div>
  )
}

export default PostPage