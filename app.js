let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
require('dotenv').config()
let app = express()

let moviesRoutes = require('./routes/MoviesRoute')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Setting our CORS policy
app.use( (req, res, next) => {
  let FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3001/"
  // Front-end
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_URL)

  // Request methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
})
app.use('/movies', moviesRoutes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})
