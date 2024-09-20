const Post = require("../models/Post");
const User = require("../models/User");

/**
 * createPost controller
 */
exports.createPost = async (req, res) => {
    try {
        // get the authenticated user
        const user = req.user;
        // create the post
        const { title, description, tag } = req.body;

        let post = await Post.create({
            user: user.id,
            title: title,
            description: description,
            tag: tag,
            picturePath: (req.file) ? req.file.path : null,
            likes: {},
            comments: []
        });
        // retrieve the post again and populate correct fields
        post = await Post.findById(post._id).populate("comments.user", "_id userName").populate("likes.$*.user", "_id userName").populate("user", "_id userName");
        // return the post
        return res.status(200).json({ success: true, post });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

/**
 * getPosts conroller
 */
exports.getPosts = async (req, res) => {
    try {
        // returns the array of all posts
        let posts = await Post.find({}).populate("comments.user", "_id userName").populate("likes.$*.user", "_id userName").populate("user", "_id userName");
        return res.status(200).json({ success: true, posts });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

/**
 * getUserPosts controller
 */
exports.getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params; 
        // get the posts by the user id
        let posts = await Post.find({ user: userId }).populate("comments.user", "_id userName").populate("likes.user", "_id userName").populate("user", "_id userName");
        return res.status(200).json({ success: true, posts });
    } catch (error) {
        // TODO: reset
        return res.status(500).json({ error });
    }
}

/**
 * getLikedPosts controller
 */
exports.getLikedPosts = async (req, res) => {
    try {
        const userId = req.params.userId;
        let posts = await Post.find({}).populate("comments.user", "_id userName").populate("likes.$*.user", "_id userName").populate("user", "_id userName");
        // filter the liked posts
        posts = posts.filter((post) => {
            return post.likes.has(userId);
        })
        return res.status(200).json({ success: true, posts });
    } catch (error) {
        // TODO: reset
        return res.status(500).json({ error });
    }
}

/**
 * updatePost controller
 */
exports.updatePost = async (req, res) => {
    try {
        // get the post by ID
        let post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, error: "Invalid request." });
        }
        // check if the user is the user of the post
        if (req.user.id !== post.user.toString()) {
            return res.status(401).json({ success: false, error: "Invalid request." });
        }
        // make the new post
        const { title, description, tag } = req.body;
        let newPost = {};
        if (title) newPost.title = title;
        if (description) newPost.description = description;
        if (tag) newPost.tag = tag;
        newPost.likes = post.likes;
        newPost.comments = post.comments;
        // update the post
        post = await Post.findByIdAndUpdate(req.params.id, { $set: newPost }, { new: true });
        return res.status(200).json({ success: true, post });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

/**
 * deletePost controller
 */
exports.deletePost = async (req, res) => {
    try {
        // find the post to delete
        const postId = req.params.id 
        let post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ success: false , error: "Invalid request." });
        }
        // check if the user is the current user
        if (req.user.id !== post.user.toString()) {
            return res.status(401).json({ success: false , error: "Invalid request." });
        }
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}

/**
 * addComment controller
 */
exports.addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        let comment = req.body.comment;
        // set the comment user to current logged in user
        comment.user = await User.findById(req.user.id, { "userName": 1, "_id": 1});
        let post = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: comment } },
            { new: true }
        );
        // if post is not found, return an error
        if (!post) {
            return res.status(404).json({ success: false, error: "Invalid request." })
        }
        return res.status(200).json({ success: true, post});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}


/**
 * removeComment controller
 */
exports.removeComment = async (req, res) => {
    try {
        // find the post by the id
        const { postId, commentId } = req.params;
        let post = await Post.findById(postId);
        // see if the post exists
        if (!post) {
            return res.status(404).json({ success: false, error: "Invalid request." });
        }
        // pull out the comment with the id
        let comment = post.comments.find(comment => comment.id === commentId);
        // see if the comment exists
        if (!comment) {
            return res.status(404).json({ success: false, error: "Invalid request." });
        }
        // see if the user matches
        if (comment.user.toString() !== req.user.id) {
            return res.status(404).json({ success: false, error: "Invalid request." });
        }
        // get remove index
        let removeIdx = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        // delete the comment from the post's arr
        post.comments.splice(removeIdx, 1);
        // save the post
        await post.save();
        return res.status(200).json({ success: true, post });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
}


/**
 * likePost controller
 */
exports.likePost = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, error: "Invalid request." })
        }

        if (post.likes.has(userId)) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId, 
            { likes: post.likes },
            { new: true }
        ).populate("comments.user", "_id userName").populate("likes.$*.user", "_id userName").populate("user", "_id userName");
        return res.status(200).json({ success: true , post: updatedPost });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error."});
    }
}

