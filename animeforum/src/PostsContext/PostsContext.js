import { createContext, useState, useContext } from "react";

export const PostsContext = createContext(null);

// contains functionality for Posts
export default function PostsProvider({ children }) {
    // store our posts array
    const [posts, setPosts] = useState([]);

    // the url
    const host = "http://localhost:5000/api";

    // our jwt token that we will pass to the backend
    const jwtToken = localStorage.getItem("token");

    // Get all posts
    const fetchAllPosts = async () => {

        // posts/fetchall endpoint
        const url = `${host}/posts/fetchAll`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
            });
    
            // check for status ok
            if (response.ok) {
                const json = await response.json();
                if (!json.error) {
                    setPosts(json.postsArr);
                }
            } else {
                setPosts([]);
            }
        } catch (error) {
            setPosts([]);
        }

    };

    return (
        <PostsContext.Provider value={{ posts, fetchAllPosts }}>
        {children}
        </PostsContext.Provider>
    );
}

// custom hook usePostsContext
export function usePostsContext() {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error("PostsContext cannot be a null value");
    } else {
        return context;
    }
}
