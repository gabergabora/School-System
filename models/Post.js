const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    des: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    Date: {
        type: Date,
        default: Date.now(),
    }
})

const Post = mongoose.model("Post", postSchema, "Post")
module.exports = Post