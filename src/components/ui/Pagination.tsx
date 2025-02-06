import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PaginationButton from "./PaginationButton";

type PaginationProps = {
    currentPage: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
  };
  
  const Pagination: React.FC<PaginationProps> = ({ currentPage, totalElements, pageSize, onPageChange, disabled }) => {
    const totalPages = Math.ceil(totalElements / pageSize);
    
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      const half = Math.floor(maxVisiblePages / 2);
  
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
  
      if (end - start < maxVisiblePages - 1) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    };
  
    return (
      <div className="pagination-container">
        <PaginationButton disabled={currentPage === 1 || disabled} onClick={() => onPageChange(currentPage - 1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </PaginationButton>
  
        {getPageNumbers().map((page) => (
          <PaginationButton key={page} disabled={disabled} active={currentPage === page} onClick={() => onPageChange(page)}>
            {page}
          </PaginationButton>
        ))}
  
        <PaginationButton disabled={currentPage === totalPages || disabled} onClick={() => onPageChange(currentPage + 1)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </PaginationButton>
      </div>
    );
  };

export default Pagination;