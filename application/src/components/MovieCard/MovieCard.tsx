import { movieType } from '../../types'
import LikesRatioBar from '../LikesRatioBar/LikesRatioBar'
import './MovieCard.scss'

const MovieCard = ({ movie }: { movie: movieType }) => {
    return (
        <div className="movie-card">
            <div className="primary-text">{movie.title}</div>
            <div className="secondary-text">{movie.category}</div>
            <LikesRatioBar likes={movie.likes} dislikes={movie.dislikes} />
        </div>
    )
}

export default MovieCard
