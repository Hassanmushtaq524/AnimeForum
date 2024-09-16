import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// CSS
import "./SignupForm.css";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signup, setError, resetState } from '../../features/authSlice';


/**
 * The signup form (used in Signup page)
 */
export default function SignupForm() {
    /**
     * Redux
     */
    const { user, status, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /**
     * Hooks 
    */
    const navigate = useNavigate();
    const signupRef = useRef();

    /**
     * Go to home if already authenticated
     */
    useEffect(() => {
        if (user) {
            navigate("/");
        } else {
            dispatch(resetState());
        }
    }, []);

    /**
     * Handle submission of data
     */
    const handleSubmit = (e) => {
        e.preventDefault(); 

        /**
         * All fields should be filled
         */
        if (!signupRef.current.name.value || !signupRef.current.email.value || !signupRef.current.password.value || !signupRef.current.conPassword.value) {
            dispatch(setError({
                error: "Invalid values"
            }))
            return;
        }

        /**
         * Check if the confirm password matches
         */
        if (signupRef.current.password.value  !== signupRef.current.conPassword.value) {
            dispatch(setError({
                error: "Password does not match"
            }));
            return;
        }

        /**
         * Store data and dispatch action
         */
        const signupInfo = {
            name: signupRef.current.name.value,
            email: signupRef.current.email.value,
            password: signupRef.current.password.value
        };
        dispatch(signup(signupInfo));
    }


    return (
        <form className="signup-form" ref={signupRef} onSubmit={handleSubmit}>
            <h4>Signup</h4>
            <div className="form-group">
                <label><h6>Full name</h6></label>
                <input type="text" name="name" className="form-control" placeholder="Enter Name"/>
            </div>
            <div className="form-group">
                <label><h6>Email</h6></label>
                <input type="email" name="email" className="form-control" placeholder="Enter Email"/>
            </div>
            <div className="form-group">
                <label><h6>Password</h6></label>
                <input type="password" name="password" className="form-control" placeholder="Enter Password"/>
            </div>
            <div className="form-group">
                <label><h6>Confirm Password</h6></label>
                <input type="password" name="conPassword" className="form-control" placeholder="Confirm Password"/>
            </div>
            <button type="submit" className="btn btn-submit">SIGNUP</button>
            <p style={(error) ? {visibility: "visible", color: "red"} : {visibility: "hidden"}}>{error}</p>
        </form>
    )
}
