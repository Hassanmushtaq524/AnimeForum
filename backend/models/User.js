const mongoose = require("mongoose");
const {Schema} = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    myPosts: [
        {
            post: {
                type: Schema.Types.ObjectId,
                ref: 'post'
            } 
        }
    ],
    likes: [
        {
            post: {
                type: Schema.Types.ObjectId,
                ref: 'post' 
            }
        }
    ]
})
const User = mongoose.model("user", UserSchema)
module.exports = User;