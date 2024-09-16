const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Signup controller
 */
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, error: "An error occurred."});
        }

        // see if email already exists
        let user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ success: false, error: "This email is already in use." })
        }
        // create secure password
        let secPass = await bcrypt.hash(password, 10);
        // create user 
        user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: secPass,
            picturePath: (req.file) ? `/assets/${req.file.filename}` : null
        })
        // create the data 
        let data = {
            user: {
                id: user.id
            }
        }
        // send the token
        const token = jwt.sign(data, process.env.JWT_SECRET);
        delete user.password;
        return res.status(201).json({ success: true, token,  user: { _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, picturePath: user.picturePath } });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." })
    }
}

/**
 * Login controller
 */
exports.login = async (req, res) => {
    try {
        // find the user
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, error: "Please use valid credentials." });
        }
        // if user is found, we compare the password
        const check = await bcrypt.compareSync(password, user.password);
        if (!check) {
            return res.status(401).json({ success: false, error: "Please use valid credentials." });
        }
        // create the token and return it
        let data = {
            user: {
                id: user.id
            }
        }
        let token = jwt.sign(data, process.env.JWT_SECRET);
        delete user.password;
        // send the token
        return res.status(200).json({ success: true, token, user: { _id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, picturePath: user.picturePath }});
    } catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }

}

exports.getUser = async (req, res) => {
    try {
        
        const { id } = req.params;
        // get the user
        let user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found."});
        }
        console.log(user);
        return res.status(200).json({ success: true, user: { firstName: user.firstName, lastName: user.lastName, picturePath: user.picturePath }});
        
    } catch (error) {

        return res.status(500).json({ error: "Internal server error." });

    }
}