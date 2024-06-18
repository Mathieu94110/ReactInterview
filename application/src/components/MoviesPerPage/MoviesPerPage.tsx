import { ChangeEvent } from 'react'
import Dropdown from './Components/Dropdown'
import './MoviesPerPage.scss'

const MoviesPerPage = ({ moviesPerPage, setNumberOfMoviesPerPage }: { moviesPerPage: number, setNumberOfMoviesPerPage: (q: number) => void }) => {

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setNumberOfMoviesPerPage(Number(event.target.value));
    };

    return (
        <div className='movies-per-page'>
            <Dropdown
                label="Nombre de films par page"
                options={[
                    { label: 4, value: 4 },
                    { label: 8, value: 8 },
                    { label: 12, value: 12 },
                ]}
                value={moviesPerPage}
                onChange={handleChange}
            />
        </div>
    );

};
export default MoviesPerPage
