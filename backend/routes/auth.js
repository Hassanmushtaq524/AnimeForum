const express = require("express");
const router = express.Router();
const { login, getUser } = require("../controllers/auth");




// LOGIN
router.post("/login", login);
router.get("/:id", getUser);

module.exports = router;