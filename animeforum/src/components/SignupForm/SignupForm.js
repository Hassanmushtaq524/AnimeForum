import React, { useRef, useState } from 'react'
// CSS
import "./SignupForm.css";

export default function SignupForm() {
    const [error, setError] = useState("");
    const signupRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!signupRef.current.name.value || !signupRef.current.email.value || !signupRef.current.password.value || !signupRef.current.conPassword.value) {
            setError("Fields cannot be empty");
        } else {

            if (signupRef.current.password.value  === signupRef.current.conPassword.value) {
                const signupInfo = {
                    name: signupRef.current.name.value,
                    email: signupRef.current.email.value,
                    password: signupRef.current.password.value
                };
                setError("");
                console.log(signupInfo);
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
