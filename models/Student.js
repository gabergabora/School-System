const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    born: {
        type: String,
    },

    phone: {
        type: String,
    },

    _class: {
        type: String,
    },

    username: {
        type: String,
        unique: true,
    },

    Date: {
        type: Date,
        default: Date.now()
    }
})

const Student = mongoose.model("Student", studentSchema, "Student")
module.exports = Student