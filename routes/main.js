var express = require("express");
var router = express.Router();
const moviesBL = require('../Bl/moviesBL')

/* GET users listing. */
router.get("/", function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }

  res.render("main", {user: req.session.user });
});





module.exports = router;
