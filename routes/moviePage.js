var express = require("express");
var router = express.Router();
const moviesBL = require("../Bl/moviesBL");

router.get("/:id", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }
  if (
    req.session.user.NumOfTransactions <= 0 &&
    req.session.user.Username != "admin"
  ) {
    res.redirect("/login");
  } else {
    req.session.user.NumOfTransactions = req.session.user.NumOfTransactions - 1;
  }

  let id = req.params.id;

  let movies = await moviesBL.getAllMovies();
  let movie = movies.find((movie) => movie.id == id);
  res.render("moviePage", { movie });
});

module.exports = router;
