const axios = require('axios')


const getAllMoviesFromApi = () => {
    return axios.get("https://api.tvmaze.com/shows")
} 



module.exports = {getAllMoviesFromApi}