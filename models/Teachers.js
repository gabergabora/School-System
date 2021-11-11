const mongoose = require("mongoose")

const teachersSchame = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    code: {
        type: String,
        required: true,
        unique: true
    },

    phone:{
        type: Number,
        required: true,
    },

    cate: {
        type: String,
    },

    born: {
        type: Date,
        required: true,
    },

    Date:{
        type: Date,
        default: Date.now()
    }
})

const Teachers = mongoose.model("Teachers", teachersSchame, "Teachers")
module.exports = Teachers