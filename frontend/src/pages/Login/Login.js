import React, { useEffect } from 'react';
// CSS
import "./Login.css";
// components
import LoginForm from '../../components/LoginForm/LoginForm.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../features/authSlice.js';

export default function Login() {
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
    }, [user, navigate, dispatch])

    return (
        <>
        <div id="login-page">
            <LoginForm/>
        </div>
        </>
    )
}
