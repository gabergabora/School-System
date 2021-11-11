const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    
    isAdmin: {
        type: Number,
        default: 0,
    },

    category: {
        type: String,
    },

    Date: {
        type: Date,
        default: Date.now()
    },

    
})

const User = mongoose.model("Users", userSchema, "Users")
module.exports = User