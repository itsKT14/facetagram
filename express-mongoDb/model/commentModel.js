const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    post_id: {
        type: String,
        required: true
    },
    post_user_id: {
        type: String,
        required: true
    },
    comment_user_id: {
        type: String,
        required: true
    },
    comment_user_pic: {
        type: String
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Comment = mongoose.model("comments", postSchema);
module.exports = Comment;