import { useEffect, useRef, useState } from 'react'
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import useClickOutside from '../../../hooks/useClickOutside'
import './Dropdown.scss'

interface DropdownItem {
    id: string;
    value: number;
}

interface DropdownProps {
    title?: string;
    data: DropdownItem[];
    selectedId?: string;
    onSelect?: (id: number) => void;
}

const Dropdown = ({
    id,
    title,
    data,
    selectedId,
    onSelect,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
        selectedId ? data?.find((item) => item.id === selectedId) : undefined
    );

    useEffect(() => {
        console.log(selectedItem)
    }, [selectedItem])
    const handleChange = (item: DropdownItem) => {
        setSelectedItem(item);
        onSelect && onSelect(item.value);
        setIsOpen(false);
    };

    useEffect(() => {
        if (selectedId && data) {
            const newSelectedItem = data.find((item) => item.id === selectedId);
            newSelectedItem && setSelectedItem(newSelectedItem);
        } else {
            setSelectedItem(undefined);
        }
    }, [selectedId, data]);

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
                <span>{selectedItem?.value || title}</span>
                {isOpen ? <GoChevronDown size={20} /> : <GoChevronUp size={20} />}
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
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;