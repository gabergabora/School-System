const mongoose = require("mongoose")

const classesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },

    Date: {
        type: Date,
        default: Date.now()
    }
})

const Classes = mongoose.model("Classes", classesSchema, "Classes")
module.exports = Classes