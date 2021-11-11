const express = require("express")
const app = express();
const db = require("./config/database")
const api = require("./routes/api")
const admin = require("./routes/admin")
const teacher = require("./routes/teacher")
const student = require("./routes/student")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const methodOverride = require("method-override");
const User = require("./models/User");
const Student = require("./models/Student");
const Teachers = require("./models/Teachers");
const TeacherCate = require("./models/TeacherCate");
const Subject = require("./models/Subject");
const Classes = require("./models/Classes");
const Tables = require("./models/Tables");
const Note = require("./models/Note");
const Homework = require("./models/Homework");

let PORT = 3000; 

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(methodOverride('_method'))

app.use("/api", api)
app.use("/admin", admin)
app.use("/teacher", teacher)
app.use("/student", student)

app.put("/admin/manage-student-edit/:code", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID })
        const { name, phone, _class, born,} = req.body
        
        if(getUesr.isAdmin == 1){
            await Student.updateOne({ username: req.params.code }, {
                $set: {
                    name: name,
                    phone: phone,
                    _class: _class,
                    born: born,
                }
            })

            res.redirect(`/admin/manage-student/name/${name}`)

        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete("/admin/manage-student/delete/:code", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID })

        if(getUesr.isAdmin == 1){
            await Student.deleteOne({ username: req.params.code })
            res.redirect("/admin/manage-student/filter/all")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete("/admin/manage-teacher/delete/:code", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})

        if(getUesr.isAdmin == 1){
            await Teachers.deleteOne({ code: req.params.code })
            res.redirect("/admin/manage-teacher/filter/all")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.put("/admin/manage-teacher-edit/:code", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})

        if(getUesr.isAdmin == 1){
            const { name, phone, cate, born} = req.body

            await Teachers.updateOne({ code: req.params.code }, {
                $set: {
                    name: name,
                    phone: phone,
                    born: born,
                    cate: cate,
                }
            })

            res.redirect("/admin/manage-teacher/filter/all")
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete("/admin/manage-teachercate/delete/:id", async (req, res) =>{
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})

        if(getUesr.isAdmin == 1){
            await TeacherCate.deleteOne({ _id: req.params.id })
            res.redirect("/admin/manage-teachercate")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.put("/admin/manage-teachercate-edit/:id", async (req, res) =>{
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})
        const getTeacherCate = await TeacherCate.findOne({ _id: req.params.id })

        if(getUesr.isAdmin == 1){
            const name = req.body.name

            await TeacherCate.updateOne({ _id: req.params.id }, {
                $set: {
                    name: name
                }
            })

            await Teachers.updateMany({ cate: getTeacherCate.name }, {
                $set: {
                    cate: name
                }
            })
            res.redirect("/admin/manage-teachercate")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete("/admin/manage-subject/delete/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})

        if (getUesr.isAdmin == 1){
            await Subject.deleteOne({ _id: req.params.id })
            res.redirect("/admin/manage-subject/filter/all")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.put("/admin/manage-subject-edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})

        if (getUesr.isAdmin == 1){
            const {name, _class} = req.body
            
            await Subject.updateOne({ _id: req.params.id }, {
                $set:{
                    name: name,
                    _class: _class,
                }
            })
            res.redirect("/admin/manage-subject/filter/all")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete("/admin/manage-classes/delete/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})

        if(getUesr.isAdmin == 1){
            await Classes.deleteOne({ _id: req.params.id })
            res.redirect("/admin/manage-classes")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.put("/admin/manage-classes-edit/:id", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})
        const getClass = await Classes.findOne({ _id: req.params.id })

        if(getUesr.isAdmin == 1){
            const name = req.body.name
            await Classes.updateOne({ _id: req.params.id }, {
                $set: {
                    name: name,
                }
            })

            await Student.updateMany({ _class: getClass.name }, {
                $set: {
                    _class: name
                }
            })

            await Homework.updateMany({ _class: getClass.name }, {
                $set: {
                    _class: name,
                }
            })

            await Tables.updateMany({ _class: getClass.name }, {
                $set: {
                    _class: name
                }
            })

            await Subject.updateMany({ _class: getClass.name }, {
                $set: {
                    _class: name,
                }
            })
            res.redirect("/admin/manage-classes")
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete("/admin/manage-table/delete/:className", async (req, res) => {
    try {
        const userID = req.cookies.id
        const getUesr = await User.findOne({ _id: userID})

        if(getUesr.isAdmin == 1){
            await Tables.deleteMany({ _class: req.params.className })
            res.redirect(`/admin/manage-table/${req.params.className}`)
        } else {
            res.render("errors/admin-error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete("/teacher/getnote/delete/:id", async (req, res) => {
    try {
        const teacherID = req.cookies.teacherID
        const getTeacher = await Teachers.findOne({ code: teacherID })

        if(getTeacher){
            await Note.deleteOne({ _id: req.params.id })
            res.redirect("/teacher/getnote")
        }
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, (err) => {
    if(err){
        console.log(err)
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})