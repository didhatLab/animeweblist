import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = window.innerWidth < 768 ? 3 : 5
    const halfVisible = Math.floor(maxVisiblePages / 2)
    
    let startPage = Math.max(1, currentPage - halfVisible)
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          onClick={() => onPageChange(1)}
          className={currentPage === 1 ? 'active' : ''}
        >
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="ellipsis">...</span>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="ellipsis">...</span>)
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button prev-button"
      >
        <span className="button-text">Предыдущая</span>
        <span className="button-icon">&lt;</span>
      </button>
      
      <div className="page-numbers">
        {renderPageNumbers()}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button next-button"
      >
        <span className="button-text">Следующая</span>
        <span className="button-icon">&gt;</span>
      </button>
    </div>
  )
}

export default Pagination 