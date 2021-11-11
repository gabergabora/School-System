const express = require("express");
const Homework = require("../models/Homework");
const Marks = require("../models/Marks");
const MarksCategory = require("../models/MarksCategory");
const Post = require("../models/Post");
const Student = require("../models/Student");
const Tables = require("../models/Tables");
const router = express.Router();

router.get("/login", async (req, res) => {
    try {
        res.render("student/login")
    } catch (error) {
        console.error(error)
    }
})


router.post("/login", async (req, res) => {
    try {
        const code = req.body.code;
        const student = await Student.findOne({ username: code })

        if(student) {
            res.cookie("studentID", student.username)
            res.redirect("/student/panel")
        } else {
            res.render("errors/student-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/panel" , async (req, res) => {
    try {
        const code = req.cookies.studentID
        const student = await Student.findOne({ username: code })
        const post = await Post.find({}).sort({ Date: -1 })

        if(student) {
            res.render("student/panel", {
                post: post,
            })
        } else {
            res.render("errors/student-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/homework", async (req, res) => {
    try {
        const code = req.cookies.studentID
        const student = await Student.findOne({ username: code})
        const homework = await Homework.find({ _class: student._class }).sort({ Date: -1 })

        if(student) {
            res.render("student/homework", {
                homework: homework,
            })
        } else {
            res.render("errors/student-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/homework/:id", async (req, res) => {
    try {
        const code = req.cookies.studentID
        const student = await Student.findOne({ username: code })
        const homework = await Homework.findOne({ _id: req.params.id })

        if(student) {
            res.render("student/homework-data", {
                homework: homework,
            })
        } else {
            res.render("errors/student-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/table", async (req, res) => {
    try {
        const code = req.cookies.studentID
        const student = await Student.findOne({ username: code})
        const sat = await Tables.find({ _class: student._class, day: "السبت" })
        const sun = await Tables.find({ _class: student._class, day: "الاحد" })
        const mon = await Tables.find({ _class: student._class, day: "الاثنين" })
        const tus = await Tables.find({ _class: student._class, day: "الثلاثاء" })
        const wed = await Tables.find({ _class: student._class, day: "الاربعاء" })
        const thur = await Tables.find({ _class: student._class, day: "الخميس" })

        if(student){
            res.render("student/table",{
                sat: sat,
                sun: sun,
                mon: mon,
                tus: tus,
                wed: wed,
                thur: thur,
            })
        } else {
            res.render("errors/student-error")
        }

    } catch (error) {
        console.error(error)
    }
})

router.get("/marks", async (req, res) => {
    try {
        const code = req.cookies.studentID
        const student = await Student.findOne({ username: code })
        const marks = await MarksCategory.find({ _class: student._class}).sort({ Date: -1})

        if(student){
            res.render("student/marks",{
                marks: marks
            })
        } else {
            res.render("errors/student-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/marks/:cat", async (req, res) => {
    try {
        const code = req.cookies.studentID
        const student = await Student.findOne({ username: code })
        const marks = await Marks.find({ code: student.username, _class: student._class, cat: req.params.cat }).sort({ Date: -1})
        if(student){
            res.render("student/marks-data", {
                marks: marks,
                month: req.params.cat
            })
        } else {
            res.render("errors/student-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/stream", async (req, res) => {
    try {
        const code = req.cookies.studentID
        const student = await Student.findOne({ username: code })
        const marks = await Marks.find({ code: student.username, _class: student._class, cat: req.params.cat }).sort({ Date: -1})
        if(student){
            res.render("student/stream", {
                marks: marks,
            })
        } else {
            res.render("errors/student-error")
        }
    } catch (error) {
        console.error(error)
    }
})

module.exports = router