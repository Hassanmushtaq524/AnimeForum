const express = require("express");
const User = require("../models/User");

// GET USER
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