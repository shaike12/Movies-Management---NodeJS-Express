var express = require("express");
var router = express.Router();
const moviesBL = require("../Bl/moviesBL");

router.get("/", function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }

  if (
    req.session.user.NumOfTransactions <= 0 &&
    req.session.user.Username != "admin"
  ) {
    res.redirect("/login");
  }
  req.session.user.NumOfTransactions = req.session.user.NumOfTransactions - 1;

  res.render("search", {});
});

router.post("/results", async function (req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  }

  let movies = await moviesBL.searchForMovies(req.body);
  
//   const movies = await Promise.all(
//     resp.map(async (movie) => {
//       let moviesArr = await moviesBL.findSameGenres(movie.genres[0]);
//       movie.sameGenres = moviesArr;
//       return movie;
//     })
//   );

  res.render("searchResults", { movies });
});

module.exports = router;
