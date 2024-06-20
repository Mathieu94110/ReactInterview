import { useEffect, useRef } from "react";
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
    const isFirstRender = useRef(true)
    // useEffect below is used to go to the previous page when there are no more movies visible on current Page
    useEffect(() => {
        if (totalPosts % moviesPerPage === 0) {
            // on page 2
            if (totalPosts === moviesPerPage && currentPageNumber === 2) {
                setPage(currentPageNumber - 1)
            }
            if (isFirstRender.current) {
                // on page 3 and more
                if (currentPageNumber > 1 && totalPosts === (moviesPerPage * (currentPageNumber - 1))) {
                    setPage(currentPageNumber - 1)
                }
                isFirstRender.current = false
            } else {
                isFirstRender.current = true
            }
        }
    }, [currentPageNumber, moviesPerPage, totalPosts])

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / moviesPerPage); i++) {
        pageNumbers.push(i);
    }

    const setPage = (page: number) => paginate(page)

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
                        onClick={() => setPage(number)}
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
