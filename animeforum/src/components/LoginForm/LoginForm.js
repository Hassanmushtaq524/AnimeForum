
// CSS
import "./LoginForm.css";
// components
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state";

export default function LoginForm() {
    // global state
    const dispatch = useDispatch();
    const user  = useSelector((globalState) => globalState.user);
    // references the form data
    const loginRef = useRef(null);
    // to navigate once logged in
    const navigate = useNavigate();
    // error error state
    const [error, setError] = useState(null);


    useEffect(() => {

        if (user) {
            navigate("/");
        }
        // we want to re-render every time the auth state or the error state changes
    }, [])

    // handling the submission of data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginInfo = {};

        if (!loginRef.current.email.value) {
            setError("Please use valid credentials");
        } else {
            if (!loginRef.current.password.value) {
                setError("Please use valid credentials");
            } else {
                loginInfo.email = loginRef.current.email.value;
                loginInfo.password = loginRef.current.password.value;
                // send the login information to log in
                loginUser(loginInfo);
            }
        } 

    }

    // logging in functionality
    const loginUser = async (loginInfo) => {

        // try logging in
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(loginInfo)
            });

            // check response
            if (response.ok) {
                const data = await response.json();
                const payload = {
                    user: data.user,
                    token: data.jwtToken
                }
                dispatch(setLogin(payload));
                // set the error
                setError(null);
                // navigate to home
                navigate("/");
            } else {
                // set the error
                setError(null);
            }
            
        } catch (error) {
            // set the error
            setError(null);
        }
        
    }



    return (
        <form className="login-form" ref={loginRef} onSubmit={handleSubmit}>
            <h4>Login</h4>
            <div className="form-group">
                <label><h6>Email</h6></label>
                <input type="email" name="email" className="form-control" placeholder="Enter Email"/>
            </div>
            <div className="form-group">
                <label><h6>Password</h6></label>
                <input type="password" name="password" className="form-control" placeholder="Enter Password"/>
            </div>
            <button type="submit" className="btn btn-submit">Login</button>
            {error && <p style={{ color: "red" }}> Invalid credentials </p>}
        </form>
    )
}
