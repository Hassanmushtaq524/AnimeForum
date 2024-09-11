
// CSS
import "./LoginForm.css";
// components
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../features";

export default function LoginForm() {
    // global state
    const dispatch = useDispatch();
    const user  = useSelector((globalState) => globalState.user);
    // references the form data
    const loginRef = useRef(null);
    // to navigate once logged in
    const navigate = useNavigate();
    // error state
    const [error, setError] = useState(false);


    useEffect(() => {
        setError(false);
        if (user) {
            navigate("/");
        }
        // we want to re-render every time the auth state or the error state changes
    }, [])

    // handling the submission of data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginInfo = {};

        if (!loginRef.current.email.value || !loginInfo.current.password.value) {
            setError("Please use valid credentials");
        } 
           
        loginInfo.email = loginRef.current.email.value;
        loginInfo.password = loginRef.current.password.value;
        // send the login information to log in
        loginUser(loginInfo);
    }

    /**
     * Login the user
     * 
     * @param {Object} loginInfo The login information
     */
    const loginUser = async (loginInfo) => {
        // try logging in
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login`
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(loginInfo)
            });

            if (!response.ok) {
                setError(true);
                return;
            }

            const data = await response.json();
            const payload = {
                user: data.user,
                token: data.jwtToken
            }
            dispatch(setLogin(payload));
            // set the error
            setError(false);
            // navigate to home
            navigate("/");
        } catch (error) {
            // set the error
            setError(true);
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
            {error && <p style={{ color: "red" }}> Invalid username/password</p>}
        </form>
    )
}
