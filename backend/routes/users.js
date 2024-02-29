const express = require("express");
const { getUser } = require("../controllers/users.js");
const router = express.Router();


// GET USER
router.get("/:id", getUser);

module.exports = router;