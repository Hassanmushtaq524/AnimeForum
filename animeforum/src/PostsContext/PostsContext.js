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
        const url = `${host}/posts/`;

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
                    const payload = {
                        posts: json.postsArr
                    }
                    setPosts(payload);
                }
            } else {
                setPosts([]);
            }
        } catch (error) {
            setPosts([]);
        }

    };

    // Get user's posts
    const fetchMyPosts = async () => {
        // the url
        const host = "http://localhost:5000/api";
        // posts/fetchMyPosts endpoint
        const url = `${host}/posts/fetchMyPosts`;
        
        try {
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            })
            if (response.ok) {
                let data = await response.json();
                setPosts(data.posts.map((el) => {
                    return el.post
                }));
            } else {
                setPosts([]);
            }
        } catch (error) {
            setPosts([]);
            console.log(error);
        }
    }
    
    // Get user's liked posts
    const fetchLikedPosts = async () => {
        // the url
        const host = "http://localhost:5000/api";
        // posts/fetchMyPosts endpoint
        const url = `${host}/posts/fetchLikedPosts`;
        
        try {
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("token")
                }
            })
            if (response.ok) {
                let data = await response.json();
                console.log(data.posts);
                setPosts(data.posts);
            } else {
                setPosts([]);
            }
        } catch (error) {
            setPosts([]);
            console.log(error);
        }

    }

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

    // Like post
    const likePost = async (id) => {
        
        try {
            
            const url = `${host}/posts/like/${id}`;

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "auth-token": jwtToken
                },
            })  

            if (!response.ok) {
                console.log("error liking");
            }


        } catch (error) {
            console.log(error);
        }
    
    }


    return (
        <PostsContext.Provider value={{ posts, fetchAllPosts, addPosts, fetchMyPosts, fetchLikedPosts, likePost }}>
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
