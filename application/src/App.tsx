import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { movies$ } from './data/movies'
import MovieCard from "./components/MovieCard/MovieCard"
import { setInitialData, removeMovie } from './features/movies/moviesSlice'
import { useAppSelector } from './app/hooks'
import { movieType } from './types'
import './App.scss'
import MovieCategories from "./components/MovieCategories/MovieCategories"

const App = () => {
  const [activePage, setCurrentPage] = useState<number>(1)
  const [moviesPerPage, setMoviesPerPage] = useState<number>(10)
  const dispatch = useDispatch()
  const allMovies = useAppSelector((state) => state.movies.allMovies);
  const filteredMovies = useAppSelector((state) => state.movies.filteredMovies)
  const indexOfLastMovie = activePage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  const currentMovies = filteredMovies && filteredMovies.length !== 0 ?
    filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie) :
    allMovies.slice(indexOfFirstMovie, indexOfLastMovie)
  const filteredCategory = Array.from(new Set(filteredMovies.map(movie => movie.category)));

  useEffect(() => {
    const fetchMovies = async () => {
      return movies$;
    };
    fetchMovies().then((data) => dispatch(setInitialData(data)));
  }, [dispatch]);

  return (
    <>
      <div className="movie-categories">
        <MovieCategories filteredCategory={filteredCategory} />
      </div>
      <div className="movies-list">
        {currentMovies && currentMovies.map((movie: movieType) => {
          return (

            <MovieCard movie={movie} key={movie.id} remove={() => dispatch(removeMovie(movie.id))} />
          )
        })
        }
      </div>
    </>
  )
}



export default App
