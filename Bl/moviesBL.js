const apiDAL = require("../Dals/apiDAL");
const jsonDAL = require("../Dals/jsonDAL");

const searchForMovies = async (data) => {
  try {
    let resp = await apiDAL.getAllMoviesFromApi();
    let moviesFromApi = resp.data;
    let moviesFromJson = await jsonDAL.readJsonFile("NewMovies.json");
    let allMovies = moviesFromApi.concat(moviesFromJson.movies);

    // Find All Movies That Associated With Search Input
    let foundedMovies = allMovies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(data.name.toLowerCase()) &&
        movie.genres.includes(data.genres) &&
        movie.language.toLowerCase() == data.language.toLowerCase()
    );

    // Find All Movies That Has Same Genres
    moviesResults = await Promise.all(
      foundedMovies.map(async (item) => {
        let sameGenre = allMovies
          .filter((movie) => movie.genres.includes(item.genres[0]))
          .map((movie) => movie.name);
        item.sameGenres = sameGenre;
        return item;
      })
    );
    return moviesResults;
  } catch (err) {
    return err;
  }
};


const addMovie = async (movie) => {
  try {
    let newId;
    let json = await jsonDAL.readJsonFile("NewMovies.json");

    // If There is No Movies in Json File Find The Last Id From Movies Rest Api
    if (json.movies.length == 0) {
      let apiMovies = await apiDAL.getAllMoviesFromApi();
      newId = apiMovies.data[apiMovies.data.length - 1].id + 1;
    } else {
      newId = json.movies[json.movies.length - 1].id + 1;
    }

    json.movies.push({ id: newId, ...movie });
    await jsonDAL.writeToJsonFile("NewMovies.json", json);
    return newId
  } catch (err) {
    console.log(err);
  }
};

const getAllMovies = async () => {
  let resp = await apiDAL.getAllMoviesFromApi();
  let moviesFromApi = resp.data;
  let moviesFromJson = await jsonDAL.readJsonFile("NewMovies.json");
  let allMovies = moviesFromApi.concat(moviesFromJson.movies);
  return allMovies;
};

module.exports = { searchForMovies, addMovie, getAllMovies };
