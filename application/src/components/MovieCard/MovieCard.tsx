import { movieType } from '../../types'
import LikesRatioBar from '../LikesRatioBar/LikesRatioBar'
import { FaTrashRestore } from "react-icons/fa";
import './MovieCard.scss'

const MovieCard = ({ movie, remove }: { movie: movieType, remove: () => void }) => {
    return (
        <div className="movie-card">
            <div className="primary-text">{movie.title}</div>
            <div className="secondary-text">{movie.category}</div>
            <LikesRatioBar likes={movie.likes} dislikes={movie.dislikes} />
            <div className="movie-card__remove-icon"><FaTrashRestore onClick={remove} /></div>
        </div>
    )
}

export default MovieCard
