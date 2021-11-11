const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = [
      new User({
        name: name,
        email: email,
        password: hashedPassword,
      }),
    ];

    newUser.forEach((data) => {
      data.save((error) => {
        if (error) {
          console.log(error);
          res.render("errors/register-error")
        } else {
          res.redirect("/api/login");
          console.log(data);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUser = await User.findOne({ email: email });
    const compare = await bcrypt.compare(password, getUser.password);

    if (compare) {
      if (getUser.isAdmin == 1) {
        res.cookie("id", getUser.id)
        res.redirect("/admin/panel");
      } else {
        res.render("errors/admin-error");
      }
    } else {
      res.render("errors/user-not-found");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
