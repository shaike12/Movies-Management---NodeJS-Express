var express = require("express");
var router = express.Router();
const moviesBL = require("../Bl/moviesBL");

router.get("/", function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }

  res.render("createNewMovie", {});
});

router.post("/create", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }

  let formData = req.body;
  let movie = {
    name: req.body.name,
    language: req.body.language,
    genres: [req.body.genres],
  };

  if (
    req.session.user.NumOfTransactions <= 0 &&
    req.session.user.Username != "admin"
  ) {
    res.redirect("/login");
  }

  try {
    let newId = await moviesBL.addMovie(movie);
    req.session.user.NumOfTransactions = req.session.user.NumOfTransactions - 1;
    res.redirect("/main");
  } catch (err) {
    console.log(err);
  }

  res.redirect("/main");
});

module.exports = router;
