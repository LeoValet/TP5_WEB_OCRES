import { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie'

function MoviesList(props) {
    const [movies, setMovies] = useState(null)
    const { backend_url } = props 
    useEffect( () => {
        // getting all movies in db
        console.log(process.env)
        console.log("url", `${backend_url}/movies`)
        axios.get(`${backend_url}/movies`)
        .then(response => {
            const movies = Object.entries(response.data).map((e) => ( { [e[0]]: e[1] } ));
            console.log(movies)
            if (!(movies && Object.keys(movies).length === 0 && Object.getPrototypeOf(movies) === Object.prototype)) {
                setMovies(movies)
            }
        })
        .catch(error => console.log(error))
    }, [backend_url])
    return (
        <div>
            {movies ? Object.entries(movies).map((movie) => <Movie key={Object.keys(movie)[0]} movie={movie}/>) : "No movies to show"}
        </div>
    )
}

export default MoviesList
