import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// CSS
import "./SignupForm.css";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { signup, setError } from '../../features/authSlice';
export default function SignupForm() {
    const { user, status, error } = useSelector((state) => state.auth);

    // useRef for the form
    const signupRef = useRef();
    // navigate
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (!signupRef.current.name.value || !signupRef.current.email.value || !signupRef.current.password.value || !signupRef.current.conPassword.value) {
            // all fields must be filled
            setError({
                error: "Invalid credentials"
            });
            return ;
        }
        // check if confirm password and password match
        if (signupRef.current.password.value  === signupRef.current.conPassword.value) {
            // prepare the data
            const signupInfo = {
                name: signupRef.current.name.value,
                email: signupRef.current.email.value,
                password: signupRef.current.password.value
            };
            // sign the user up
            dispatch(signup(signupInfo));
        } else {
            setError({
                error: "Confirm Password"
            });
        }
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
            <button type="submit" className="btn btn-submit">signup</button>
            <p style={(error !== "") ? {visibility: "visible", color: "red"} : {visibility: "hidden"}}>{error}</p>
        </form>
    )
}
