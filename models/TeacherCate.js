const mongoose = require("mongoose")

const teachercateShema = new mongoose.Schema({
    name:{
        type: String,
    },

    Date:{
        type: Date,
        default: Date.now()
    }
})

const TeacherCate = mongoose.model("Teacher Category", teachercateShema, "Teacher Category")
module.exports = TeacherCate