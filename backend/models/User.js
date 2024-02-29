const mongoose = require("mongoose");
const {Schema} = mongoose;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 30
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        min: 5,
        max: 30
    },
    picturePath: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model("user", UserSchema)
module.exports = User;