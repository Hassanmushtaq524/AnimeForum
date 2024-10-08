
// components
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login, setError, resetState } from "../../features/authSlice";



/**
 * The login form component (used in Login page)
 */
export default function LoginForm() {
    /**
     * Redux
     */
    const { user, status, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    /**
     * Hooks
     */
    const loginRef = useRef(null);
    const navigate = useNavigate();

    /**
     * Handle submission of data
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loginRef.current.email.value || !loginRef.current.password.value) {
            dispatch(setError({ 
                error: "Invalid credentials"
            }))
            return;
        }

        const loginInfo = {
            email: loginRef.current.email.value,
            password: loginRef.current.password.value
        }

        /**
         * Dispatch the login action
         */
        dispatch(login(loginInfo));
    }


    return (
        <form className="login-form p-4 border-1 border-secondary rounded-xl flex flex-col gap-y-6 w-1/2" ref={loginRef} onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className="form-group">
                <label><h6>Email</h6></label>
                <input type="email" name="email" className="form-control" placeholder="Enter Email"/>
            </div>
            <div className="form-group">
                <label><h6>Password</h6></label>
                <input type="password" name="password" className="form-control" placeholder="Enter Password"/>
            </div>
            <button type="submit" className="btn btn-submit">Login</button>
            <p style={(error) ? {visibility: "visible", color: "red"} : {visibility: "hidden"}}>Invalid username or password</p>
        </form>
    )
}
