const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {

    try {
        
        const { firstName, lastName, email, password, picturePath } = req.body;
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
            picturePath: picturePath,
            likes: []
        })
        // create the data 
        let data = {
            user: {
                id: user.id
            }
        }
        // send the token
        const jwtToken = jwt.sign(data, process.env.JWT_SECRET);
        return res.status(201).json({ success: true, jwtToken,  user: { id: user.id, firstName, lastName, email, picturePath } });

    } catch (error) {

        return res.status(500).json({ error: "Internal server error." })

    }

}

// LOGIN
exports.login = async (req, res) => {
    
    try {

        // find the user
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Please use valid credentials." });
        }
        // if user is found, we compare the password
        const check = await bcrypt.compareSync(password, user.password);
        if (!check) {
            return res.status(400).json({ success: false, error: "Please use valid credentials." });
        }
        // create the token and return it
        let data = {
            user: {
                id: user.id
            }
        }
        let jwtToken = jwt.sign(data, process.env.JWT_SECRET);
        delete user.password;
        // send the token
        return res.status(200).json({ success: true, jwtToken, user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, picturePath: user.picturePath }});

    } catch (error) {

        return res.status(500).json({ error: "Internal server error." });

    }

}