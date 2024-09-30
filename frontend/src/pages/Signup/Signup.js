import React, { useEffect } from 'react'
// components
import SignupForm from '../../components/SignupForm/SignupForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../features/authSlice';

export default function Signup() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Go to home if already authenticated
   */
  useEffect(() => {
      if (user) {
          navigate("/");
      } else {
          dispatch(resetState());
      }
  }, [user, dispatch, navigate])

  return (
    <div id="signup-page">
           <SignupForm/>
    </div>
  )
}
