import React from 'react'
// CSS
import "./LoginForm.css";
// components
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const loginRef = useRef(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginInfo = {};

        if (!loginRef.current.email.value) {
            setMessage("show");
        }
        if (!loginRef.current.password.value) {
            setMessage("show");
        }

        loginInfo.email = loginRef.current.email.value;
        loginInfo.password = loginRef.current.password.value;
        
        const url = "http://localhost:5000/api/auth/login";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(loginInfo)
        });

        // check response 
        if (response.ok) {
            const data = await response.json();
            if (data) {
                localStorage.setItem("token", data.jwtToken);
                setMessage(null);
                navigate("/");
            }
        } else {
            // display alert
            setMessage("show");
        }

    }

    return (
        <div className="login">
            <h4>Login</h4>
            <form className="login-form" ref={loginRef} onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="email" className="form-control" placeholder="Enter Email"/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control" placeholder="Enter Password"/>
                </div>
                <button type="submit" className="btn btn-submit">Login</button>
            </form>
            <p style={(message === "show") ? {visibility: "visible", color: "red"} : {visibility: "hidden"}}>Please enter correct values.</p>
        </div>
    )
}
