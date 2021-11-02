let express = require('express')
let router = express.Router()
const axios = require('axios')
let JsonDB = require('node-json-db').JsonDB
let Config = require('node-json-db/dist/lib/JsonDBConfig').Config
const db = new JsonDB(new Config("db", true, false, '/'))

/* GET all movies. */
router.get('/', function(req, res, next) {
    res.send(db.getData('/movies'))
})

/* GET a Movie by id. */
router.get('/:id', function(req, res, next) {
    let id = req.params.id
    console.log(id)
    try {
      let movie = db.getData(`/movies/${id}`)
      res.status(200).send(movie)
    } catch(error) {
      res.status(404).send({"error": "movie not found"})
    }
})

/* PUT a movie to db by name. */
router.put('/', function(req, res, next) {
  let movie_name = req.body.movie_name
  // check if movie already exists:
  const URL = process.env.OMDAPI_URL
  const API_KEY = process.env.API_KEY
  // getting movie from omdapi (example request : http://www.omdbapi.com/?t=inception&apikey=dca68f3b)
  axios.get(`${URL}/?t=${movie_name}&apikey=${API_KEY}`)
  .then(response => {
    const movie = response.data
    const new_movie = {
      id: movie.imdbID,
      movie: movie.Title,
      yearOfRelease: new Date(movie.Year).getFullYear(),
      duration: parseInt(movie.Runtime.split(' ')[0]),
      actors: movie.Actors.split(',').map(actor => actor.trim()),
      poster: movie.Poster,
      boxOffice: parseInt(movie.BoxOffice.replace(/[,$]/g, "")),
      rottenTomatoesScore: parseInt(movie.Ratings.filter(rating => rating.Source == "Rotten Tomatoes")[0].Value)
    }
    console.log(new_movie)
    // check if already in database:
    if (db.exists(`/movies/${new_movie.id}`)) {
      res.status(403).send({"error": `movie ${movie_name} already exists in database`})
    } 
    else {
      db.push(`/movies/${new_movie.id}`, new_movie)
      res.send({movie: new_movie})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(error.status).send(error)
  })
})

/* DELETE a movie to db by name. */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  const db_path = `/movies/${id}`
  if (db.exists(db_path)) {
    let deleted_movie = db.getData(db_path)
    db.delete(db_path)
    res.status(200).send(deleted_movie)
  } else {
    res.status(404).send({"error": "movie not found"})
  }
})

module.exports = router