import { memo, useEffect, useState } from 'react'
import MultiSelectDropdown from './Components/MultiSelectDropdown/MultiSelectDropdown'
import { Category } from 'types'
import './MovieCategories.scss'

const MovieCategories = ({ filteredCategories, handleSelect }: { filteredCategories: Category[], handleSelect: (c: Category[]) => void }) => {
    const [selected, setSelected] = useState<Category[]>([])

    const toggleCategory = ({ category }: { category: Category }) => {
        setSelected(prevSelected => {
            // if it's in, remove
            const newArray = [...prevSelected]
            if (newArray.includes(category)) {
                return newArray.filter(item => item != category)
                // else, add
            } else {
                newArray.push(category)
                return newArray
            }
        })
    }

    useEffect(() => {
        handleSelect(selected)
    }, [handleSelect, selected])

    return (
        <MultiSelectDropdown categories={filteredCategories} selected={selected} toggleCategory={toggleCategory} />
    )
}
// Here memo is used to avoid useless render when props not changing
export default memo(MovieCategories, (prevProps, newProps) => {
    if (prevProps.filteredCategories === newProps.filteredCategories) {
        return true
    }
})
