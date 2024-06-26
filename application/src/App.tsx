import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { movies$ } from './data/movies'
import MovieCard from "components/MovieCard/MovieCard"
import { setInitialData, removeMovie, filterMovies } from 'features/movies/moviesSlice'
import { useAppSelector } from 'app/hooks'
import { Category, movieType } from 'types'
import MovieCategories from "components/MovieCategories/MovieCategories"
import Pagination from "components/Pagination/Pagination"
import MoviesPerPage from "components/MoviesPerPage/MoviesPerPage"
import './App.scss'

const App = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [moviesPerPage, setMoviesPerPage] = useState<number | undefined>(undefined)
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([])

  const dispatch = useDispatch()
  const allMovies = useAppSelector((state) => state.movies.allMovies)
  const filteredMovies = useAppSelector((state) => state.movies.filteredMovies)
  const currentMoviesLength = filteredMovies && filteredMovies.length !== 0 ? filteredMovies.length : allMovies.length
  let currentMovies

  if (moviesPerPage) {
    const indexOfLastMovie = currentPage * moviesPerPage
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage
    // If no data found in filteredMovies list we display allMovies list
    currentMovies = filteredMovies && filteredMovies.length !== 0 ?
      filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie) :
      allMovies.slice(indexOfFirstMovie, indexOfLastMovie)
    // Same logic for currentMovies list length
  } else {
    currentMovies = filteredMovies && filteredMovies.length !== 0 ? filteredMovies : allMovies
  }


  // Initial data loading
  useEffect(() => {
    const fetchMovies = async () => {
      return movies$
    }
    fetchMovies().then((data) => dispatch(setInitialData(data)))
  }, [dispatch])


  useEffect(() => {
    const newFilteredCategories = Array.from(new Set(allMovies.map(movie => movie.category)))
    // we use JSON.stringify to compare the two returned arrays in order to avoid useless state mutation
    if (JSON.stringify(newFilteredCategories) !== JSON.stringify(filteredCategories)) {
      setFilteredCategories(Array.from(new Set(allMovies.map(movie => movie.category))) as Category[])
    }
  }, [allMovies, filteredCategories])

  // Pagination
  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const previousPage = (): void => {
    setCurrentPage((current: number) => {
      return current - 1
    })
  }

  const nextPage = (): void => {
    setCurrentPage((current: number) => {
      return current + 1
    })
  }
  //
  const handleMoviesPerPageChange = (q: number): void => {
    setMoviesPerPage(q)
  }

  return (
    <>
      <div className="movie-filters">
        <MovieCategories filteredCategories={filteredCategories} handleSelect={(selection) => dispatch(filterMovies(selection))} />
        <MoviesPerPage moviesPerPage={moviesPerPage} setNumberOfMoviesPerPage={handleMoviesPerPageChange} />
      </div>
      <div className="movies-list">
        {currentMovies && currentMovies.map((movie: movieType) => {
          return (
            <MovieCard movie={movie} key={movie.id} remove={() => dispatch(removeMovie(movie.id))} />
          )
        })
        }
      </div>
      {moviesPerPage && currentMoviesLength >= moviesPerPage ? (
        <Pagination
          moviesPerPage={moviesPerPage}
          totalPosts={currentMoviesLength}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
          currentPageNumber={currentPage}
        />
      ) : (null)}
    </>
  )
}



export default App
