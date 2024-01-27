const mongoose = require("mongoose");
const {Schema} = mongoose;
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ]
})
const Post = mongoose.model("post", PostSchema)
module.exports = Post;