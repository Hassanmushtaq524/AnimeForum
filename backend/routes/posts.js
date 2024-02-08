const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

// ROUTE 1
// /api/posts/create: POST, auth required
router.post("/create", fetchuser,
    [body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 })],
    async (req, res) => {
        try {
            let success = false;
            // validating our request
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            // get the authenticated user
            const user = req.user;
            // create the post
            const { title, description, tag } = req.body;
            let post = await Post.create({
                user: user.id,
                title,
                description,
                tag
            });
            // return the post
            success = true;
            return res.status(200).json({ success, post })
        } catch (error) {
            return res.status(500).json({ error: "Internal server error." });
        }
    })

// ROUTE 2
// /api/post/fetch: GET
router.get("/fetchAll", async (req, res) => {
    try {
        let success = false;
        // returns the array of all posts
        let postsArr = await Post.find({}).populate("comments.user", "_id name").populate("likes.user", "_id name").populate("user", "_id name");
        success = true;
        return res.status(200).json({ success, postsArr });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
})

// ROUTE 3
// /api/post/update/:id : PUT, auth required
router.put("/update/:id", fetchuser, async (req, res) => {
    try {
        let success = false;
        // make the new post
        const { title, description, tag } = req.body;
        let newPost = {};
        if (title) newPost.title = title;
        if (description) newPost.description = description;
        if (tag) newPost.tag = tag;
        // get the post by ID
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ success, error: "Invalid request." });
        }
        // check if the user is the user of the post
        if (req.user.id !== post.user.toString()) {
            return res.status(400).json({ success, error: "Invalid request." });
        }
        // update the post
        post = await Post.findByIdAndUpdate(req.params.id, { $set: newPost }, { new: true });
        success = true;
        return res.status(200).json({ success, post });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
})

// ROUTE 4
// /api/posts/delete: DELETE, auth required
router.delete("/delete/:id", fetchuser, async (req, res) => {
    try {
        let success = false;
        // find the post to delete
        let post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(400).json({ success, error: "Invalid request." });
        }
        // check if the user is the current user
        if (req.user.id !== post.user.toString()) {
            return res.status(400).json({ success, error: "Invalid request." });
        }
        let deleted = await Post.deleteOne({ _id: post._id });
        success = true;
        return res.status(200).json({ success });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
})

// ROUTE 5
// /api/posts/comment: PUT, auth required
router.put("/comment", fetchuser, async (req, res) => {
    try {
        let success = false;
        let comment = req.body.comment;
        // set the comment user to current logged in user
        comment.user = await User.findById(req.user.id, { "name": 1, "_id": 1});
        let post = await Post.findByIdAndUpdate(
            req.body.postId,
            { $push: { comments: comment } },
            { new: true }
        );
        // .populate("comments.user", "_id name").populate("user", "_id name")
        // if post is not found, return an error
        if (!post) {
            return res.status(400).json({success, error: "Invalid request."})
        }
        success = true;
        return res.status(200).json({success, post});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
})

// ROUTE 6
// /api/posts/uncomment/:id/:commentID : DELETE, auth required
router.delete("/uncomment/:id/:commentID", fetchuser, async (req, res) => {
    try {
        // success
        let success = false;
        // find the post by the id
        let postID = req.params.id;
        let post = await Post.findById(postID);
        // see if the post exists
        if (!post) {
            return res.status(400).json({ success, error: "Invalid request." });
        }
        // pull out the comment with the id
        let commentID = req.params.commentID;
        let comment = post.comments.find(comment => comment.id === commentID);
        // see if the comment exists
        if (!comment) {
            return res.status(400).json({ success, error: "Invalid request." });
        }
        // see if the user matches
        if (comment.user.toString() !== req.user.id) {
            return res.status(400).json({ success, error: "Invalid request." });
        }
        // get remove index
        let removeIdx = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        // delete the comment from the post's arr
        post.comments.splice(removeIdx, 1);
        // save the post
        await post.save();
        // successful request
        success = true;
        return res.status(200).json({ success });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
})

// ROUTE 7
// /api/posts/like/:id: PUT, auth required
router.put("/like/:id", fetchuser, async (req, res) => {

    try {
        let success = false;
        const user = req.user; 
        const postId = req.params.id;
        // find post of the id
        let post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({ success, error: "Invalid request."});
        }
        // check if already liked
        if (post.likes.filter((like) => like.user.toString() === user.id).length > 0) {
            return res.status(400).json({ success, error: "Post already liked."} );
        }
        // push the like
        post.likes.push({ user: user.id })
        // push it into user data
        await User.findByIdAndUpdate(user.id, 
            { $push: { likes: { post: post.id }}}, 
            { $new: true });
        await post.save();
        success = true;
        return res.status(200).json({ success, post })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error."});
    }

})
// ROUTE 8
// /api/posts/unlike/:id: DELETE, auth required
router.delete("/unlike/:id", fetchuser, async (req, res) => {

    try {
        let success = false;
        // get the user from the database 
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "Invalid request."});
        }
        // find posts
        let post = await Post.findById(req.params.id);
        // return error if post doesnt exist
        if (!post) {
            return res.status(400).json({ success, error: "Invalid request." });
        }
        // check if post.likes has index with user.id 
        if (post.likes.filter((like) => like.user.toString() === user.id.toString()).length === 0) {
            return res.status(400).json ({ success, error: "Post not liked" });
        }
        // remove the like otherwise from posts
        let removeIdx = post.likes.map((like) => like.user.toString()).indexOf(user.id.toString());
        post.likes.splice(removeIdx, 1);
        await post.save();
        // remove the post from user.likes  
        removeIdx = user.likes.map((like) => like.post.toString()).indexOf(post.id.toString());
        user.likes.splice(removeIdx, 1);
        await user.save();
        success = true;
        return res.status(200).json({ success, post });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error."});
    }

})


module.exports = router;