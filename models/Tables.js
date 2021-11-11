const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema({
    day:{
        type: String,
        required: true,
    },

    _class:{
        type: String,
        requried: true,
    },

    seq: {
        type: String,
        required: true,
    },

    subject: {
        type: String,
    },

    Date:{
        type: Date,
        default: Date.now()
    }
})

const Tables = mongoose.model("Tabels", tableSchema, "Tables")
module.exports = Tables