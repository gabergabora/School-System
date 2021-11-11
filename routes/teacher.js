const express = require("express");
const Teachers = require("../models/Teachers");
const Classes = require("../models/Classes");
const Homework = require("../models/Homework");
const Note = require("../models/Note");
const router = express.Router()

router.get("/login-teacher", async (req, res) => {
    try {
        res.render("teacher/login")
    } catch (error) {
        console.error(error)
    }
})

router.post("/login-teacher", async (req, res) => {
    try {
        const { code } = req.body
        const getTeacher = await Teachers.findOne({ code: code })

        if(getTeacher){
            res.cookie("teacherID", getTeacher.code)
            res.redirect("/teacher/home")
            
        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/home", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })

        if(getTeacher){
            res.render("teacher/home", {
                data: getTeacher,
            })
        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})


router.get("/add-homework", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })
        const classes = await Classes.find({})
        if(getTeacher){
            res.render("teacher/add-homework", {
                teacher: getTeacher,
                classes: classes,
            })
        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.post("/add-homework", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })
        if(getTeacher){
            const { _class, homework } = req.body

            const newHomework = [
                new Homework({
                    name: getTeacher.name,
                    homework: homework,
                    _class: _class,
                    subject: getTeacher.cate,
                })
            ]

            newHomework.forEach((data) => {
                data.save((error) => {
                    if(error){
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect("/teacher/home")
                    }
                })
            })

        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/homework-history/filter/:filter", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })
        const classes = await Classes.find({})
        const hw = await Homework.find({ name: getTeacher.name, subject: getTeacher.cate}).sort({ Date: -1 })
        if(getTeacher){
            if(req.params.filter == "all"){
                res.render("teacher/homework-history", {
                    teacher: getTeacher,
                    classes: classes,
                    hw: hw,
                })
            } else if (req.params.filter !== "all"){
                const hw = await Homework.find({ name: getTeacher.name, _class: req.params.filter ,subject: getTeacher.cate}).sort({ Date: -1 })
                res.render("teacher/homework-history", {
                    teacher: getTeacher,
                    classes: classes,
                    hw: hw,
                })
            }
        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/note", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })
        if(getTeacher){
            res.render("teacher/add-note", {
                teacher: getTeacher,
            })
        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.post("/note", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })
        if(getTeacher){
            const { title, note } = req.body
            const newNote = [
                new Note({
                    code: teacherID,
                    title: title,
                    note: note,
                })
            ]

            newNote.forEach((data) => {
                data.save((error) => {
                    if(error){
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect("/teacher/home")
                    }
                })
            })
        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/getnote", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })
        const note = await Note.find({ code: teacherID })
        if(getTeacher){
            res.render("teacher/notes", {
                teacher: getTeacher,
                note: note,
            })
        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/getnote/:id", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })
        const note = await Note.findOne({ _id: req.params.id })
        if(getTeacher){
            res.render("teacher/getnote", {
                teacher: getTeacher,
                note: note,
            })
        } else {
            res.render("errors/teacher-error")
        }
    } catch (error) {
        console.error(error)
    }
})
module.exports = router