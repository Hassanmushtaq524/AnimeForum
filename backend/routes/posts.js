const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { getPosts, getUserPosts, updatePost, deletePost, getLikedPosts, addComment, removeComment, likePost } = require("../controllers/posts");


// READ
router.get("/liked", fetchuser, getLikedPosts);
router.get("/:userId", getUserPosts);
router.get("/", getPosts);

// UPDATE
router.put("/:id", fetchuser, updatePost);

// DELETE
router.delete("/:id", fetchuser, deletePost);

// COMMENT
router.put("/comment/:postId", fetchuser, addComment);


// DELETE COMMENT
router.delete("/uncomment/:postId/:commentId", fetchuser, removeComment)

// TOGGLE LIKE
router.put("/like/:postId", fetchuser, likePost)

module.exports = router;