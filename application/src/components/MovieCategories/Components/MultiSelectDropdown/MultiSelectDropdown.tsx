import { IoIosArrowDropdownCircle } from "react-icons/io";
import './MultiSelectDropdown.scss'

const MultiSelectDropdown = ({ options, selected, toggleOption }) => {

    return (
        <div className="multi-select-dropdown">
            <div className="multi-select-dropdown__selected">
                <div>{selected.length} catégories sélectionnées</div>
                <IoIosArrowDropdownCircle />
            </div>
            <ul className="multi-select-dropdown__options">
                {options.map((option, index) => {
                    const isSelected = selected.includes(option.id);

                    return (
                        <li key={index} className="multi-select-dropdown__option" onClick={() => toggleOption({ id: option.id })}>
                            <input type="checkbox" checked={isSelected} className="multi-select-dropdown__option-checkbox"></input>
                            <span className="multi-select-dropdown__title">{option.title}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MultiSelectDropdown
