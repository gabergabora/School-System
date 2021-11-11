const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    _class: {
        type: String,
        required: true,
    },

    Date: {
        type: Date,
        default: Date.now()
    }
})

const Subject = mongoose.model("Subject", subjectSchema, "Subject")
module.exports = Subject