const mongoose = require("mongoose");
const { Schema } = mongoose;
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    title: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    description: {
        type: String,
        required: true,
        min: 5
    },
    tag: {
        type: String,
        required: true,
        min: 2
    },
    date: {
        type: Date,
        default: Date.now,
    },
    picturePath: {
        type: String,
        default: ""
    },
    likes: {
        type: Map,
        of: Boolean
    },
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
        }
    ]
    });
const Post = mongoose.model("post", PostSchema);
module.exports = Post;
