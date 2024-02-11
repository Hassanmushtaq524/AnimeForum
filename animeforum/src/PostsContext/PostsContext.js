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

    // Adding posts 
    const addPosts = async (newPost, setError) => {

        try {

            const url = `${host}/posts/create`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": jwtToken
                },
                body: JSON.stringify(newPost)
            })

            if (response.ok) {
                const data = await response.json();
                // add the post
                setPosts(posts.concat(data.post));
                // set error to false
                setError(false);
            } else {
                // set error to false
                setError(true);
            }

        } catch (error) {
            // set error to false
            setError(true);
        }
        
    }


    return (
        <PostsContext.Provider value={{ posts, fetchAllPosts, addPosts }}>
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
