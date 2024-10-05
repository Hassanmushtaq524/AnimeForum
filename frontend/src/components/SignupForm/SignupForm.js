import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
        if (!signupRef.current.firstName.value || 
            !signupRef.current.lastName.value ||
            !signupRef.current.userName.value ||
            !signupRef.current.email.value || 
            !signupRef.current.password.value || 
            !signupRef.current.conPassword.value) {

            dispatch(setError({
                error: "Fields cannot be empty"
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
            userName: signupRef.current.userName.value,
            firstName: signupRef.current.firstName.value,
            lastName: signupRef.current.lastName.value,
            email: signupRef.current.email.value,
            password: signupRef.current.password.value
        };
        dispatch(signup(signupInfo));
    }


    return (
        <form ref={signupRef} onSubmit={handleSubmit}
              className="signup-form 
                         p-4 
                         border-1 border-secondary rounded-xl 
                         grid grid-cols-2 gap-4
                         w-1/2" >
            <h3 className="text-primary col-span-2">Signup</h3>
            <div className="form-group col-span-1">
                <label><h6>First Name</h6></label>
                <input type="text" name="firstName" className="form-control" placeholder="Enter First Name"/>
            </div>
            <div className="form-group col-span-1">
                <label><h6>Last Name</h6></label>
                <input type="text" name="lastName" className="form-control" placeholder="Enter Last Name"/>
            </div>
            <div className="form-group col-span-2">
                <label><h6>User Name</h6></label>
                <input type="text" name="userName" className="form-control" placeholder="Enter User Name"/>
            </div>
            <div className="form-group col-span-2">
                <label><h6>Email</h6></label>
                <input type="email" name="email" className="form-control" placeholder="Enter Email"/>
            </div>
            <div className="form-group col-span-1">
                <label><h6>Password</h6></label>
                <input type="password" name="password" className="form-control" placeholder="Enter Password"/>
            </div>
            <div className="form-group col-span-1">
                <label><h6>Confirm Password</h6></label>
                <input type="password" name="conPassword" className="form-control" placeholder="Confirm Password"/>
            </div>
            <button type="submit" className="btn btn-submit col-span-2">SIGNUP</button>
            <p style={(error) ? {visibility: "visible", color: "red"} : {visibility: "hidden"}}>{error}</p>
        </form>
    )
}
