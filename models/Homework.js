const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    homework:{
        type: String,
        required: true,
    },

    subject: {
        type: String,
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

const Homework = mongoose.model("Homework", homeworkSchema, "Homework")
module.exports = Homework