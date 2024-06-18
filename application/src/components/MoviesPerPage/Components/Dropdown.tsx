import { ChangeEvent } from 'react'
import './Dropdown.scss'

const Dropdown = ({ label, value, options, onChange }:
    {
        label: string, value: number, options:
        { label: number, value: number }[], onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    }) => {

    return (

        <label className='dropdown'>

            <span className='dropdown__label'>{label}</span>

            <select className='dropdown__select' value={value} onChange={onChange}>

                {options.map((option) => (

                    <option value={option.value}>{option.value}</option>

                ))}

            </select>

        </label>

    );

};

export default Dropdown
