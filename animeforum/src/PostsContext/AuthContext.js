import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider ({ children }) {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});
    const host = "http://localhost:5000/api";

    // state needs to persist after refresh
    useEffect(() => {
        if (localStorage.getItem("token")) {
            // set auth to true
            setAuth(true);
            // get the returned user
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            setAuth(false);
            setUser({});
        }
    }, [])

    // signs up the user
    const signupUser = async (signupInfo, setError) => {
        const url = `${host}/auth/signup`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(signupInfo)
            });

            if (response.ok) {
                const data = await response.json();
                // save the token in local storage
                localStorage.setItem("token", data.jwtToken)
                // save the returned user
                localStorage.setItem("user", JSON.stringify(data.user));
                // get the returned user
                setUser(JSON.parse(localStorage.getItem("user")));
                // user is now authenticated
                setAuth(true);
                // set the error
                setError("");
            } else {
                setAuth(false);
                setError("Please enter correct values");
            }

        } catch (error) {
            setAuth(false);
            // set the error
            setError("Please enter correct values");
        }

    }

    // logs the user in and updates the authentication state
    const loginUser = async (loginInfo, setError) => {

        const url = `${host}/auth/login`;

        // try logging in
        try {

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
                // save the token in local storage
                localStorage.setItem("token", data.jwtToken);
                // save the returned user
                localStorage.setItem("user", JSON.stringify(data.user));
                // get the returned user
                setUser(JSON.parse(localStorage.getItem("user")));
                // user is now authenticated
                setAuth(true);
                // set the error
                setError(false);
            } else {
                setAuth(false);
                // set the error
                setError(true);
            }
            

        } catch (error) {
            setAuth(false);
            // set the error
            setError(true);
        }
        
    }

    // logs out the user
    const logoutUser = () => {
        // remove token
        localStorage.removeItem("token");
        // remove user
        localStorage.removeItem("user");
        // set auth to false
        setAuth(false);
        // remove user
        setUser({});
    }



    return (
        <AuthContext.Provider value={ { user, auth, loginUser, logoutUser, signupUser } }>
            { children }
        </AuthContext.Provider>
    )

}

// useAuth custom hook to return the context
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext cannot be a null value");
    } else {
        return context;
    }
}