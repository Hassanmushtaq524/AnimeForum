import { createContext, useState, useContext } from "react";

export const PostsContext =  createContext(null);


// contains functionality for Posts
export default function PostsProvider({ children }) {
    // store our posts array
    const [posts, setPosts] = useState([]);

    // Get all posts
    const fetchAllPosts = () => {
        //    temporary data
        const postsData = {
            "success": true,
            "postsArr": [
              {
                "_id": "65349b7809bf7197a11914dd",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "First post",
                "description": "testing!",
                "tag": "epic",
                "date": "2023-10-22T03:48:08.209Z",
                "comments": [
                  {
                    "text": "First comment on this post",
                    "user": {
                      "_id": "6534a074b7b16faea3a2f31f",
                      "name": "Hassan"
                    },
                    "_id": "65b46fee9028913709fbf92a",
                    "date": "2024-01-27T02:52:30.768Z"
                  },
                  {
                    "text": "First comment on this post",
                    "user": {
                      "_id": "6534a074b7b16faea3a2f31f",
                      "name": "Hassan"
                    },
                    "_id": "65b473c89028913709fbf92e",
                    "date": "2024-01-27T03:08:56.928Z"
                  },
                  {
                    "text": "testest",
                    "user": {
                      "_id": "6534a074b7b16faea3a2f31f",
                      "name": "Hassan"
                    },
                    "_id": "65b473d69028913709fbf933",
                    "date": "2024-01-27T03:09:10.506Z"
                  }
                ],
                "__v": 3
              },
              {
                "_id": "65b568356220b12a912d26d5",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "second post",
                "description": "by me!",
                "tag": "epic",
                "date": "2024-01-27T20:31:49.516Z",
                "comments": [],
                "__v": 1
              },
              {
                "_id": "65b568356220b12a912d26d5",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "second post",
                "description": "by me!",
                "tag": "epic",
                "date": "2024-01-27T20:31:49.516Z",
                "comments": [],
                "__v": 1
              },
              {
                "_id": "65b568356220b12a912d26d5",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "second post",
                "description": "by me!",
                "tag": "epic",
                "date": "2024-01-27T20:31:49.516Z",
                "comments": [],
                "__v": 1
              },
              {
                "_id": "65b568356220b12a912d26d5",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "second post",
                "description": "by me!",
                "tag": "epic",
                "date": "2024-01-27T20:31:49.516Z",
                "comments": [],
                "__v": 1
              },
              {
                "_id": "65b568356220b12a912d26d5",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "second post",
                "description": "by me!",
                "tag": "epic",
                "date": "2024-01-27T20:31:49.516Z",
                "comments": [],
                "__v": 1
              },
              {
                "_id": "65b568356220b12a912d26d5",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "second post",
                "description": "by me!",
                "tag": "epic",
                "date": "2024-01-27T20:31:49.516Z",
                "comments": [],
                "__v": 1
              },
              {
                "_id": "65b568356220b12a912d26d5",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "second post",
                "description": "by me!",
                "tag": "epic",
                "date": "2024-01-27T20:31:49.516Z",
                "comments": [],
                "__v": 1
              },
              {
                "_id": "65b568356220b12a912d26d5",
                "user": {
                  "_id": "6520a71f2c454536364cac54",
                  "name": "Hassan"
                },
                "title": "second post",
                "description": "by me!",
                "tag": "epic",
                "date": "2024-01-27T20:31:49.516Z",
                "comments": [],
                "__v": 1
              }
            ]
        }
        const temp = JSON.parse(JSON.stringify(postsData));
        setPosts(temp.postsArr);
    }
    return (
        <PostsContext.Provider value={{ posts, fetchAllPosts }}>
            { children }
        </PostsContext.Provider>
    )
}

// custom hook usePostsContext
export function usePostsContext() {
    const context = useContext(PostsContext)
    if (!context) {
        throw new Error("PostsContext cannot be a null value");
    } else {
        return context;
    }
}