const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { getPosts, getUserPosts, updatePost, deletePost, getLikedPosts, addComment, removeComment, likePost } = require("../controllers/posts");



/**************************************
 * POSTS
**************************************/

/**
 * Gets posts made by a user
 * 
 * Method: GET
*/
router.get("/:userId/", getUserPosts);


/**
 * Fetches all the posts
 * 
 * Method: GET
*/
router.get("/", getPosts);


/**
 * Updates the post made by authenticated user
 * 
 * Method: PUT
 * Content-type: application/json
 * Authorization: required
 * Body: { title, description, tag }
*/
router.put("/:id", fetchuser, updatePost);


/**
 * Deletes the post made by authenticated user
 * 
 * Method: DELETE
 * Authorization: required
*/
router.delete("/:id", fetchuser, deletePost);



/**************************************
 * COMMENTS
**************************************/

/**
 * Adds a comment made by authenticated user to the post
 *  
 * Method: PUT
 * Content-type: application/json
 * Authorization: required
 * Body: { text }
*/
router.put("/comment/:postId", fetchuser, addComment);


/**
 * Deletes the comment made by authenticated user
 * 
 * Method: DELETE
 * Content-type: application/json
 * Authorization: required
*/
router.delete("/uncomment/:postId/:commentId", fetchuser, removeComment)



/**************************************
 * LIKES
**************************************/

/**
 * Toggles like for a post
 * 
 * Method: PUT
 * Authorization: required
*/
router.put("/like/:postId", fetchuser, likePost)


/**
 * Fetches the posts liked by user
 * 
 * Method: GET
 */
router.get("/:userId/liked", getLikedPosts);


module.exports = router;