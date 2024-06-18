import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { movies$ } from './data/movies'
import MovieCard from "./components/MovieCard/MovieCard"
import { setInitialData, removeMovie, filterMovies } from './features/movies/moviesSlice'
import { useAppSelector } from './app/hooks'
import { Category, movieType } from './types'
import MovieCategories from "./components/MovieCategories/MovieCategories"
import './App.scss'

const App = () => {
  const [activePage, setCurrentPage] = useState<number>(1)
  const [moviesPerPage, setMoviesPerPage] = useState<number>(10)
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])
  const dispatch = useDispatch()
  const allMovies = useAppSelector((state) => state.movies.allMovies);
  const filteredMovies = useAppSelector((state) => state.movies.filteredMovies)
  const indexOfLastMovie = activePage * moviesPerPage
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
  // If no data found in filteredMovies list we display allMovies list
  const currentMovies = filteredMovies && filteredMovies.length !== 0 ?
    filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie) :
    allMovies.slice(indexOfFirstMovie, indexOfLastMovie)

  // Initial data loading
  useEffect(() => {
    const fetchMovies = async () => {
      return movies$;
    };
    fetchMovies().then((data) => dispatch(setInitialData(data)));
  }, [dispatch]);


  useEffect(() => {
    const newFilteredCategories = Array.from(new Set(allMovies.map(movie => movie.category)));
    // we use JSON.stringify to compare the two returned arrays in order to avoid useless state mutation
    if (JSON.stringify(newFilteredCategories) !== JSON.stringify(filteredCategories)) {
      setFilteredCategories(Array.from(new Set(allMovies.map(movie => movie.category))))
    }
  }, [allMovies, filteredCategories])

  return (
    <>
      <MovieCategories filteredCategories={filteredCategories} handleSelect={(selection) => dispatch(filterMovies(selection))} />
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
