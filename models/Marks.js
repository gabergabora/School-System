const mongoose = require("mongoose")

const marksSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },

    subject: {
        type: String,
        required: true,
    },

    month:{
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    _class: {
        type: String,
        required: true,
    },

    cat: {
        type: String,
        required: true,
    },

    mark: {
        type: Number,
        required: true,
    },

    fullmark:{
        type: Number,
        required: true,
    },

    Date: {
        type: Date,
        default: Date.now()
    }
})

const Marks = mongoose.model("Marks", marksSchema, "Marks")
module.exports = Marks