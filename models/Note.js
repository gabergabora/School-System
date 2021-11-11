const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    note:{
        type: String,
        required: true,
    },

    Date: {
        type:Date,
        default: Date.now(),
    },
})

const Note = mongoose.model("Note", noteSchema, "Note")
module.exports = Note