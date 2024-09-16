const express = require("express");
const router = express.Router();
const { login, getUser } = require("../controllers/auth");


/**
 * Logs in the user
 * 
 * Method: POST
 * Content-type: application/json
 * Body: { email, password }
*/
router.post("/login", login);


/**
 * Get the user picture and name
 * 
 * Method: GET
*/
router.get("/:id", getUser);


module.exports = router;