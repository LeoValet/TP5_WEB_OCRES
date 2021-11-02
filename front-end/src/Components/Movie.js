function Movie(props) {
    let {movie} = props
    let movie_id = Object.keys(movie[1])[0]
    let movie_data = movie[1][movie_id]
    return (
        <div>
            <div className="card">
            <img src={movie_data.poster} alt="Avatar" style={{"width":"50%", "height": "50%"}}></img>
            <div className="container">
                <h4><b>{movie_data.movie}</b></h4> 
                <p>{movie_data.duration} Min</p> 
                <p>Actors: {movie_data.actors.map(actor => " - "+actor + " - ")}</p>
                <p>Rotten Tomatoes Score: {movie_data.rottenTomatoesScore}%</p>
            </div>
            </div>
        </div>
    )
}

export default Movie
