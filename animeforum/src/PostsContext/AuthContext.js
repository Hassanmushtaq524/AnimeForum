import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider ({ children }) {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState({});


    // logs the user in and updates the authentication state
    const loginUser = async (loginInfo, setError) => {

        const url = "http://localhost:5000/api/auth/login";

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
                localStorage.setItem("token", data.jwtToken);
                setUser(data.user);
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
        localStorage.removeItem("token");
        setAuth(false);
        setUser({});
    }


    return (
        <AuthContext.Provider value={ { user, auth, loginUser, logoutUser } }>
            { children }
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("AuthContext cannot be a null value");
    } else {
        return context;
    }
}