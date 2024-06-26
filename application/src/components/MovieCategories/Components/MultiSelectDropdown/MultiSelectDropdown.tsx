import { useRef, useState } from "react"
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi"
import { Category } from "types"
import useClickOutside from "hooks/useClickOutside"
import './MultiSelectDropdown.scss'

const MultiSelectDropdown = ({ categories, selected, toggleCategory }: { categories: Category[], selected: Category[], toggleCategory: (cat: { category: Category }) => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const multiSelectDropdownRef = useRef<HTMLDivElement>(null)
    useClickOutside({
        ref: multiSelectDropdownRef,
        handler: () => setIsDropdownOpen(false),
    })

    const selectedCategoriesLength = categories.filter(c => selected.includes(c)).length

    return (
        <div ref={multiSelectDropdownRef} className="multi-select-dropdown">
            <button aria-label='Toggle dropdown'
                className='multi-select-dropdown__button'
                aria-haspopup='true'
                aria-expanded={isDropdownOpen}
                type='button' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span>{selectedCategoriesLength} {selectedCategoriesLength > 1 ? 'catégories sélectionnées' : 'catégorie sélectionnée'}</span>
                {isDropdownOpen ? <FiArrowDownCircle size={20} /> : <FiArrowUpCircle size={20} />}
            </button>

            <ul className={`multi-select-dropdown__options ${isDropdownOpen ? 'multi-select-dropdown__options-active' : 'multi-select-dropdown__options-default'}`}>
                {categories && categories.length ? categories.map((category: Category, index) => {
                    const isSelected = selected.includes(category)

                    return (
                        <li key={index} className="multi-select-dropdown__option" onClick={() => toggleCategory({ category })}>
                            <input type="checkbox" checked={isSelected} className="multi-select-dropdown__option-checkbox"></input>
                            <span className="multi-select-dropdown__title">{category}</span>
                        </li>
                    )
                }) : <p>Aucune catégorie disponible</p>}
            </ul>
        </div>
    )
}

export default MultiSelectDropdown
