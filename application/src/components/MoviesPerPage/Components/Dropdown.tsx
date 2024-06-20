import { useRef, useState } from 'react'
import { FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi"
import useClickOutside from 'hooks/useClickOutside'
import './Dropdown.scss'

interface DropdownItem {
    id: number;
    value: string;
}

interface DropdownProps {
    id: string,
    title?: string;
    moviesPerPage?: number,
    data: DropdownItem[];
    selectedId?: number;
    onSelect?: (id: number) => void;
}

const Dropdown = ({
    id,
    title,
    moviesPerPage,
    data,
    selectedId,
    onSelect,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
        selectedId ? data?.find((item) => item.id === selectedId) : undefined
    );

    const handleChange = (item: DropdownItem) => {
        setSelectedItem(item);
        onSelect && onSelect(item.id);
        setIsOpen(false);
    };

    const dropdownRef = useRef<HTMLDivElement>(null);
    useClickOutside({
        ref: dropdownRef,
        handler: () => setIsOpen(false),
    });

    return (
        <div ref={dropdownRef} className='dropdown'>
            <button
                id={id}
                aria-label='Toggle dropdown'
                aria-haspopup='true'
                aria-expanded={isOpen}
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className='dropdown__button'
            >
                <span>{moviesPerPage || title}</span>
                {isOpen ? <FiArrowDownCircle size={20} /> : <FiArrowUpCircle size={20} />}
            </button>
            {isOpen && (
                <div aria-label='Dropdown menu' className='dropdown__list'>
                    <ul
                        role='menu'
                        aria-labelledby={id}
                        aria-orientation='vertical'
                    >
                        {data?.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => handleChange(item)}
                                className={`dropdown__list-item ` +
                                    (selectedItem?.id === item.id ? `dropdown__list-item--active` : '')}
                            >
                                <span>{item.id}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;