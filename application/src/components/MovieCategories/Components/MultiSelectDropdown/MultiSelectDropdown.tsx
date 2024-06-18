import { useState } from "react"
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi"
import { Category } from "../../../../types";
import './MultiSelectDropdown.scss'

const MultiSelectDropdown = ({ categories, selected, toggleCategory }: { categories: Category[], selected: Category[], toggleCategory: (cat: Category[]) => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    return (
        <div className="multi-select-dropdown">
            <div className="multi-select-dropdown__selected" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div>{selected.length} {selected.length > 1 ? 'catégories sélectionnées' : 'catégorie sélectionnée'}</div>
                {isDropdownOpen ? <FiArrowUpCircle /> : <FiArrowDownCircle />}
            </div>
            <ul className={`multi-select-dropdown__options ${isDropdownOpen ? 'multi-select-dropdown__options-active' : 'multi-select-dropdown__options-default'}`}>
                {categories.map((category, index) => {
                    const isSelected = selected.includes(category);

                    return (
                        <li key={index} className="multi-select-dropdown__option" onClick={() => toggleCategory({ category })}>
                            <input type="checkbox" checked={isSelected} className="multi-select-dropdown__option-checkbox"></input>
                            <span className="multi-select-dropdown__title">{category}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default MultiSelectDropdown
