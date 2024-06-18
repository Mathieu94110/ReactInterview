import { useState } from 'react';
import './MovieCategories.scss';
import MultiSelectDropdown from './Components/MultiSelectDropdown/MultiSelectDropdown';

const MovieCategories = ({ filteredCategory }: { filteredCategory: string[] }) => {
    const [selected, setSelected] = useState([])
    // test with fake data
    const data = [
        { id: 1, title: 'Thriller' },
        { id: 2, title: 'Drame' },
        { id: 3, title: 'Comedy' },
        { id: 4, title: 'Animation' },
    ]
    const toggleOption = ({ id }) => {
        setSelected(prevSelected => {
            // if it's in, remove
            const newArray = [...prevSelected]
            if (newArray.includes(id)) {
                return newArray.filter(item => item != id)
                // else, add
            } else {
                newArray.push(id)
                return newArray;
            }
        })
    }

    return (
        <MultiSelectDropdown options={data} selected={selected} toggleOption={toggleOption} />
    )
    // return (
    //     <div className='movie-categories'>
    //         {filteredCategory.map(category => category)}
    //     </div>
    // )
}

export default MovieCategories
