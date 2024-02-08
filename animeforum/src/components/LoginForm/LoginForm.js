
// CSS
import "./LoginForm.css";
// components
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../PostsContext/AuthContext';

export default function LoginForm() {
    // AuthContext
    const { auth, loginUser } = useAuth();
    // references the form data
    const loginRef = useRef(null);
    // to navigate once logged in
    const navigate = useNavigate();
    // error error state
    const [error, setError] = useState(null);


    useEffect(() => {

        if (auth) {
            navigate("/");
        }
        // we want to re-render every time the auth state or the error state changes
    }, [auth, error])

    // handling the submission of data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginInfo = {};

        if (!loginRef.current.email.value) {
            setError(true);
        } else {
            if (!loginRef.current.password.value) {
                setError(true);
            } else {
                loginInfo.email = loginRef.current.email.value;
                loginInfo.password = loginRef.current.password.value;
                // send the login information to log in
                loginUser(loginInfo, setError);
            }
        } 

    }

    return (
        <form className="login-form" ref={loginRef} onSubmit={handleSubmit}>
            <h4>Login</h4>
            <div className="form-group">
                <input type="email" name="email" className="form-control" placeholder="Enter Email"/>
            </div>
            <div className="form-group">
                <input type="password" name="password" className="form-control" placeholder="Enter Password"/>
            </div>
            <button type="submit" className="btn btn-submit">Login</button>
            <p style={(error) ? {visibility: "visible", color: "red"} : {visibility: "hidden"}}>Please enter correct values.</p>
        </form>
    )
}
