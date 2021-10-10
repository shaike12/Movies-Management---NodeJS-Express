var express = require("express");
var router = express.Router();
var usersBL = require("../Bl/usersBL");

router.get("/", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.Username !== "admin") {
    res.redirect("/login");
  }

  let users = await usersBL.getUsers();

  res.render("usersManagement", { users: users });
});

router.get("/delete/:id", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.Username !== "admin") {
    res.redirect("/login");
  }
  if (
    req.session.user.NumOfTransactions <= 0 &&
    req.session.user.Username != "admin"
  ) {
    res.redirect("/login");
  }
  try {
    await usersBL.deleteUser(req.params.id);
    req.session.user.NumOfTransactions = req.session.user.NumOfTransactions - 1;
  } catch (err) {
    console.log(err);
  }

  res.redirect("/users_management");
});

// If No id Show Empty Form
router.get("/edit/:id?", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.Username !== "admin") {
    res.redirect("/login");
  }
  let user;
  if (req.params.id) {
    user = await usersBL.getUserById(req.params.id);
  }

  res.render("editUser", { user: user });
});

router.post("/edit/:id?", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else if (req.session.user.Username !== "admin") {
    res.redirect("/login");
  }
  if (
    req.session.user.NumOfTransactions <= 0 &&
    req.session.user.Username != "admin"
  ) {
    res.redirect("/login");
  }

  if (req.params.id) {
    let formData = { ...req.body, id: Number(req.params.id) };
    await usersBL.editUser(formData);
    req.session.user.NumOfTransactions = req.session.user.NumOfTransactions - 1;
  } else {
    let date_ob = new Date();
    // current day
    let day = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    let fullDate = day + "/" + month + "/" + year;
    let formData = { ...req.body, CreatedDate: fullDate };
    await usersBL.addUser(formData);
    req.session.user.NumOfTransactions = req.session.user.NumOfTransactions - 1;
  }

  res.redirect("/users_management");
});

module.exports = router;
