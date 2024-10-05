import React from 'react'
// components
import AddPost from '../AddPost/AddPost.js';
import { useSelector } from 'react-redux';
export default function SideBar() {

  const { user, status, error } = useSelector((state) => state.auth);

  return (
    <div id="sideBar">
        {user ? <AddPost/> : <>Login/Signup bro</>}
    </div>
  )
}
