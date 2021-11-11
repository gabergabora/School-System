const mongoose = require("mongoose")

const markscategorySchema = new mongoose.Schema({
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
        default: Date.now(),
    }
})

const MarksCategory = mongoose.model("Marks Category", markscategorySchema, "Marks Category")
module.exports = MarksCategory