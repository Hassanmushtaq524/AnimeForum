const mongoose = require("mongoose");
const {Schema} = mongoose;
const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post'
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const Comment = mongoose.model("comment", CommentSchema)
module.exports = Comment;