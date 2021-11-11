const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Classes = require("../models/Classes")
const Student = require("../models/Student")
const TeacherCate = require("../models/TeacherCate")
const Teachers = require("../models/Teachers")
const Tables = require("../models/Tables")
const Subject = require("../models/Subject")
const Marks = require("../models/Marks")
const multer = require("multer")
const Post = require("../models/Post")
const MarksCategory = require("../models/MarksCategory")

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/upload/images")
    },

    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    },
})

const upload = multer({
    storage: storage,
    limit: {
        fileSize: 1024 * 1024 * 1000 * 1000,
    }
})

router.get("/panel", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            res.render("admin/panel")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
        res.render("errors/admin-error")
    }
})

router.get("/add-data", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            res.render("admin/add-data")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
        res.render("errors/admin-error")
    }
})

router.get("/add-class", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            res.render("admin/add-class")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
        res.render("errors/admin-error")
    }
})

router.post("/add-class", async (req, res) => {
    try {
        const { name } = req.body
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            const newClass = [
                new Classes({
                    name: name,
                })
            ]

            newClass.forEach((data) => {
                data.save((error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect("/admin/add-class")
                    }
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-student", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const getClasses = await Classes.find({})

        if (getUser.isAdmin == 1) {
            res.render("admin/add-student", {
                classes: getClasses,
            })
        } else {
            res.redirect("/admin/add-class")
        }
    } catch (error) {
        console.log(error)
        res.render("errors/admin-error")
    }
})


router.post("/add-student", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            const { name, born, phone, _class, code } = req.body



            const newStudent = [
                new Student({
                    name: name,
                    born: born,
                    phone: phone,
                    _class: _class,
                    username: code,
                })
            ]

            newStudent.forEach((data) => {
                data.save((error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect("/admin/add-student")
                    }
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-teachercate", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            res.render("admin/add-teachercate")
        } else {
            res.render("error/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})


router.post("/add-teachercate", async (req, res) => {
    try {

        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            const { name } = req.body

            const newTeacherCate = [
                new TeacherCate({
                    name: name,
                })
            ]

            newTeacherCate.forEach((data) => {
                data.save((error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect("/admin/add-teachercate")
                    }
                })
            })
        }

    } catch (error) {
        console.log(error)
        res.render("error/admin-error")
    }
})

router.get("/add-teacher", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const cate = await TeacherCate.find({}).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            res.render("admin/add-teacher", {
                cate: cate
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add-teacher", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            const { name, born, phone, cate, code } = req.body

            const newTeacher = [
                new Teachers({
                    name: name,
                    born: born,
                    code: code,
                    cate: cate,
                    phone: phone,
                })
            ]

            newTeacher.forEach((data) => {
                data.save((error) => {
                    if (error) {
                        console.log(error)
                        res.render("errors/admin-error")
                    } else {
                        console.log(data)
                        res.redirect("/admin/add-teacher")
                    }
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-table", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID })
        const _class = await Classes.find({}).sort({ Date: -1 })

        if (getUesr.isAdmin == 1) {
            res.render("admin/add-table", {
                classes: _class
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add-table", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            const { _class, day, seq, subject } = req.body

            const newTable = [
                new Tables({
                    day: day,
                    _class: _class,
                    seq: seq,
                    subject: subject,
                })
            ]

            newTable.forEach((data) => {
                data.save((error) => {
                    if (error) {
                        console.log(error)
                        res.render("errors/valid_info")
                    } else {
                        console.log(data)
                        res.redirect("/admin/add-table")
                    }
                })
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-subject/filter/all", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const subject = await Subject.find({})
        const _class = await Classes.find({})

        if (getUser.isAdmin == 1) {
            res.render("admin/add-subject", {
                subject: subject,
                _class: _class,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-subject/filter/:_class", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const subject = await Subject.find({ _class: req.params._class })
        const _class = await Classes.find({})

        if (getUser.isAdmin == 1) {
            res.render("admin/add-subject", {
                subject: subject,
                _class: _class,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-subject/add", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const _class = await Classes.find({})
        if (getUser.isAdmin == 1) {
            res.render("admin/add-subject-data", {
                _class: _class,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add-subject/add", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            const { name, _class } = req.body

            const newSubject = [
                new Subject({
                    name: name,
                    _class: _class
                })
            ]

            newSubject.forEach((data) => {
                data.save((error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect("/admin/add-subject/add")
                    }
                })
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-marks/class/:filter", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const _class = await Classes.find({}).sort({ Date: -1 })
        const filter = req.params.filter

        if (getUser.isAdmin == 1) {
            if (filter == "all" || filter == "") {
                const student = await Student.find({}).sort({ Date: -1 })
                res.render("admin/add-marks", {
                    classes: _class,
                    user: student,
                })
            } else {
                const fixer = filter.replace("-", " ")
                const getStudent = await Student.find({ _class: fixer })
                res.render("admin/add-marks", {
                    classes: _class,
                    user: getStudent,
                })
            }
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-marks/class/all/name/:name", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            const name = req.params.name
            const fixer = name.replace("-", " ")
            const getStudent = await Student.find({ name: fixer })
            const _class = await Classes.find({}).sort({ Date: -1 })

            res.render("admin/add-marks", {
                classes: _class,
                user: getStudent,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-marks-data/:code", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const username = req.params.code
        const user = await Student.findOne({ username: username })
        const subject = await Subject.find({ _class: user._class })
        const marksCat = await MarksCategory.find({}).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            
            res.render("admin/add-marks-data", {
                user: user,
                subject: subject,
                marksCat: marksCat,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add-marks-data/:code", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const student = await Student.findOne({ username: req.params.code })

        if (getUser.isAdmin == 1) {
            const { month, subject, mark, fullmark, cat } = req.body
            const newMarks = [
                new Marks({
                    name: student.name,
                    _class: student._class,
                    subject: subject,
                    month: month,
                    code: req.params.code,
                    mark: mark,
                    cat: cat,
                    fullmark: fullmark,
                })
            ]

            newMarks.forEach((data) => {
                data.save((error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect(`/admin/add-marks-data/${req.params.code}`)
                    }
                })
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-marks-cat", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const classes = await Classes.find({}).sort({ Date: -1})
        if(getUser.isAdmin == 1){
            res.render("admin/add-marks-cat", {
                classes: classes,
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add-marks-cat", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if(getUser.isAdmin == 1){
            const { name, _class } = req.body
            const newMarksCat = [
                new MarksCategory({
                    name: name,
                    _class: _class,
                })
            ]

            newMarksCat.forEach((data) => {
                data.save((error) => {
                    if(error){
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect("/add-marks-cat")
                    }
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/information-management", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            res.render("admin/information-management")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-student/filter/all", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const student = await Student.find({}).sort({ Date: -1 })
        const classes = await Classes.find({}).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-student", {
                student: student,
                classes: classes,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-student/filter/:filter", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const student = await Student.find({ _class: req.params.filter }).sort({ Date: -1 })
        const classes = await Classes.find({}).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-student", {
                student: student,
                classes: classes,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-student/name/:name", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const studentName = req.params.name;
        const fixer = studentName.replace("-", " ")
        const student = await Student.find({ name: fixer }).sort({ Date: -1 })
        const classes = await Classes.find({}).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-student", {
                student: student,
                classes: classes,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-student-edit/:code", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const student = await Student.findOne({ username: req.params.code })
        const _class = await Classes.find({})

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-student-edit", {
                student: student,
                _class: _class,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-teacher/filter/all", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getStudent = await User.findOne({ _id: userID })
        const teachers = await Teachers.find({}).sort({ Date: -1 })
        const teacherCate = await TeacherCate.find({})

        if (getStudent.isAdmin == 1) {
            res.render("admin/manage-teacher", {
                teachers: teachers,
                teacherCate: teacherCate,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.error(error)
    }
})

router.get("/manage-teacher/filter/:filter", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const teachers = await Teachers.find({ cate: req.params.filter }).sort({ Date: -1 })
        const teacherCate = await TeacherCate.find({})

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-teacher", {
                teachers: teachers,
                teacherCate: teacherCate,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-teacher/name/:name", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const teachers = await Teachers.find({ name: req.params.name }).sort({ Date: -1 })
        const teacherCate = await TeacherCate.find({})

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-teacher", {
                teachers: teachers,
                teacherCate: teacherCate,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-teacher-edit/:code", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const teacher = await Teachers.findOne({ code: req.params.code })
        const teacherCate = await TeacherCate.find({})

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-teacher-edit", {
                teacher: teacher,
                teacherCate: teacherCate,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-teachercate", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const teachercate = await TeacherCate.find({})

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-teachercate", {
                cate: teachercate
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})


router.get("/manage-teachercate-edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const teacherCate = await TeacherCate.findOne({ _id: req.params.id })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-teachercate-edit", {
                cate: teacherCate,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-subject/filter/all", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const _class = await Classes.find({})
        const subject = await Subject.find({}).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-subject", {
                _class: _class,
                subject: subject,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-subject/filter/:filter", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const _class = await Classes.find({})
        const subject = await Subject.find({ _class: req.params.filter }).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-subject", {
                _class: _class,
                subject: subject,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-subject-edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const _class = await Classes.find({})
        const subject = await Subject.findOne({ _id: req.params.id }).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-subject-edit", {
                _class: _class,
                subject: subject,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-classes", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const _class = await Classes.find({}).sort({ Date: -1 })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-classes", {
                _class: _class,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-classes-edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const _class = await Classes.findOne({ _id: req.params.id })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-classes-edit", {
                _class: _class,
            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/manage-table/:_className", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })
        const _class = await Classes.findOne({ name: req.params._className })
        const sat = await Tables.find({ _class: _class.name, day: "السبت" })
        const sun = await Tables.find({ _class: _class.name, day: "الاحد" })
        const mon = await Tables.find({ _class: _class.name, day: "الاثنين" })
        const tus = await Tables.find({ _class: _class.name, day: "الثلاثاء" })
        const wed = await Tables.find({ _class: _class.name, day: "الاربعاء" })
        const thur = await Tables.find({ _class: _class.name, day: "الخميس" })

        if (getUser.isAdmin == 1) {
            res.render("admin/manage-table", {
                _class: _class,
                sat: sat,
                sun: sun,
                mon: mon,
                tus: tus,
                wed: wed,
                thur: thur,

            })
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/add-post", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if (getUser.isAdmin == 1) {
            res.render("admin/add-post")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add-post", upload.single("image"), async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUser = await User.findOne({ _id: userID })

        if(getUser.isAdmin == 1){
            const { title, des, image } = req.body
            const newPost = [
                new Post({
                    title: title,
                    des: des,
                    image: req.file.filename,
                })
            ]

            newPost.forEach((data) => {
                data.save((error) => {
                    if(error){
                        console.log(error)
                    } else {
                        console.log(data)
                        res.redirect("/admin/add-post")
                    }
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;