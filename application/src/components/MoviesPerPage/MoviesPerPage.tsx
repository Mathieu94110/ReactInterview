// import { ChangeEvent } from 'react'
import Dropdown from './Components/Dropdown'
import './MoviesPerPage.scss'

const MoviesPerPage = ({ moviesPerPage, setNumberOfMoviesPerPage }: { moviesPerPage: number, setNumberOfMoviesPerPage: (q: string) => void }) => {

    const handleSelect = (value: string) => {
        console.log(value)
        setNumberOfMoviesPerPage(value);
    };

    const data = [
        {
            id: "0",
            value: 4,
        },
        {
            id: "1",
            value: 8,
        },
        {
            id: "2",
            value: 12,
        }
    ]
    return (
        <Dropdown
            title='Films par page'
            data={data}
            onSelect={handleSelect}
        />
    );

};
export default MoviesPerPage
