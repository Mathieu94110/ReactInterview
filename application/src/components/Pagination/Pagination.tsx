import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import './Pagination.scss'

const Pagination = ({
    moviesPerPage,
    totalPosts,
    paginate,
    previousPage,
    nextPage,
    currentPageNumber,
}: {
    moviesPerPage: number;
    totalPosts: number;
    paginate: (x: number) => void;
    previousPage: () => void;
    nextPage: () => void;
    currentPageNumber: number;
}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / moviesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className="pagination">
                {currentPageNumber > 1 && (
                    <li onClick={previousPage} className="pagination__item">
                        <FaArrowLeft />
                    </li>
                )}
                {pageNumbers.map((number: number, index: number) => (
                    <li
                        key={index}
                        onClick={() => paginate(number)}
                        className={
                            `pagination__item ` +
                            (number === currentPageNumber ? `pagination__item--active` : '')
                        }
                    >
                        {number}
                    </li>
                ))}
                {currentPageNumber < pageNumbers.length && (
                    <li onClick={nextPage} className="pagination__item">
                        <FaArrowRight />
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Pagination
