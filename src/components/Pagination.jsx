import React from "react";
import styles from "../styles/pagination.module.css";
import { RiArrowRightSLine } from "react-icons/ri";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { RiArrowLeftSLine } from "react-icons/ri";

const Pagination = ({
  data,
  setCurrentPage,
  currentPage,
  pageSize,
  totalItems,
}) => {
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    const totalPages = Math.ceil(totalItems / pageSize);
    setCurrentPage(totalPages);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(totalItems / pageSize);
  let pageNumbers = [];

  if (totalPages <= 7) {
    pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    if (currentPage <= 3) {
      pageNumbers = [1, 2, 3, 4, "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      pageNumbers = [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
    } else {
      pageNumbers = [
        1,
        2,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
    }
  }

  return (
    <div>
      <div className={styles["pagination-container"]}>
        <button
          className={styles.button}
          onClick={goToFirstPage}
          disabled={currentPage === 1}
        >
          {/* <i className="ri-arrow-left-double-line" /> */}
          {/* {"<<"} */}
          <MdOutlineKeyboardDoubleArrowLeft style={{ fontSize: "24px" }} />
        </button>
        <button
          className={styles.button}
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          {/* <i className="ri-arrow-left-s-line" /> */}

          <RiArrowLeftSLine style={{ fontSize: "24px" }} />
        </button>

        {pageNumbers.map((page, index) => (
          <button
            key={index}
            className={`${styles.button} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() =>
              typeof page === "number" ? handlePageChange(page) : null
            }
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className={styles.button}
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages == 0}
        >
          {/* <i className="ri-arrow-right-s-line" /> */}
          {/* {">"} */}
          <RiArrowRightSLine style={{ fontSize: "24px" }} />
        </button>
        <button
          className={styles.button}
          onClick={goToLastPage}
          disabled={currentPage === totalPages || totalPages == 0}
        >
          {/* <i className="ri-arrow-right-double-line" /> */}
          {/* {">>"} */}
          <MdKeyboardDoubleArrowRight style={{ fontSize: "24px" }} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
