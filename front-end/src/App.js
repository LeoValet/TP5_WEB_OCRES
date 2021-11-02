import './App.css'
import MoviesList from './Components/MoviesList'

function App() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000"
  return (
    <div className="App">
      <MoviesList backend_url={BACKEND_URL}/>
    </div>
  )
}

export default App
