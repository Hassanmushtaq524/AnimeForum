const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "bradley";


// ROUTE 1
// /api/auth/signup: POST
router.post("/signup",
    [body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 })],
    async (req, res) => {
        try {
            // see if we pass validation
            let success = false;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }
            // see if email already exists
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success: success, error: "This email is already in use." })
            }
            // create secure password
            let salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, 10);
            // create user 
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            // create the data 
            let data = {
                user: {
                    id: user.id
                }
            }
            // send the token
            const jwtToken = jwt.sign(data, jwtSecret);
            success = true;
            return res.status(200).json({ success, jwtToken });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error." })
        }

    })

// ROUTE 2
// /api/auth/login: POST
router.post("/login",
    [body("email").isEmail(),
    body("password").exists()],
    async (req, res) => {
        try {
            // see if we pass validation
            let success = false;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }
            // find the user
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please use valid credentials." });
            }
            // if user is found, we compare the password
            const check = await bcrypt.compareSync(password, user.password);
            if (!check) {
                return res.status(400).json({ success, error: "Please use valid credentials." });
            }
            // create the token and return it
            let data = {
                user: {
                    id: user.id
                }
            }
            let jwtToken = jwt.sign(data, jwtSecret);
            // send the token
            success = true;
            return res.status(200).json({ success, jwtToken: jwtToken });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error." });
        }
    })

// ROUTE 3
// /api/auth/getuser: GET, auth required
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        // get the user from the ID
        let success = false;
        const user = await User.findById(req.user.id).select("-password");
        // successfully return the user
        success = true;
        return res.status(200).json({ success, user })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
})

module.exports = router;