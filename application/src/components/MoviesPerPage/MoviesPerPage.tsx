import Dropdown from './Components/Dropdown'
import './MoviesPerPage.scss'

const MoviesPerPage = ({ moviesPerPage, setNumberOfMoviesPerPage }: { moviesPerPage: number | undefined, setNumberOfMoviesPerPage: (q: number) => void }) => {

    const handleSelect = (value: number) => {
        setNumberOfMoviesPerPage(value);
    };

    const data = [
        {
            id: 4,
            value: '4 films par page',
        },
        {
            id: 8,
            value: '8 films par page',
        },
        {
            id: 12,
            value: '12 films par page',
        }
    ]
    return (
        <Dropdown
            id='Films'
            title='Films par page'
            moviesPerPage={moviesPerPage}
            data={data}
            onSelect={handleSelect}
        />
    );

};
export default MoviesPerPage
