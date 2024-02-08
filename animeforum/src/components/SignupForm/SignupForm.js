import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
// CSS
import "./SignupForm.css";
import { useAuth } from '../../PostsContext/AuthContext';

export default function SignupForm() {
    // context states
    const { auth, signupUser} = useAuth();
    // error state
    const [error, setError] = useState("");
    // useRef for the form
    const signupRef = useRef();
    // navigate
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [auth])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!signupRef.current.name.value || !signupRef.current.email.value || !signupRef.current.password.value || !signupRef.current.conPassword.value) {
            // all fields must be filled
            setError("Fields cannot be empty");
        } else {
            // check if confirm password and password match
            if (signupRef.current.password.value  === signupRef.current.conPassword.value) {
                // prepare the data
                const signupInfo = {
                    name: signupRef.current.name.value,
                    email: signupRef.current.email.value,
                    password: signupRef.current.password.value
                };
                // sign the user up
                signupUser(signupInfo, setError);

            } else {
                setError("Passwords do not match");
            }
        }

        
        
    }


    return (
        <form className="signup-form" ref={signupRef} onSubmit={handleSubmit}>
            <h4>Signup</h4>
            <div className="form-group">
                <input type="text" name="name" className="form-control" placeholder="Enter Name"/>
            </div>
            <div className="form-group">
                <input type="email" name="email" className="form-control" placeholder="Enter Email"/>
            </div>
            <div className="form-group">
                <input type="password" name="password" className="form-control" placeholder="Enter Password"/>
            </div>
            <div className="form-group">
                <input type="password" name="conPassword" className="form-control" placeholder="Confirm Password"/>
            </div>
            <button type="submit" className="btn btn-submit">signup</button>
            <p style={(error !== "") ? {visibility: "visible", color: "red"} : {visibility: "hidden"}}>{error}</p>
        </form>
    )
}
