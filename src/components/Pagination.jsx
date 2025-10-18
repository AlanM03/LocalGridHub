function Pagination({ currentPage, totalPages, setCurrentPage }) {
  // base case don't show pagination if there's only one or no pages
  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    rangeWithDots.push(1);

    // Add pages around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Add dots if there's a gap
    if (currentPage - delta > 2) {
      rangeWithDots.push('...');
    }

    // Add the range
    rangeWithDots.push(...range);

    // Add dots if there's a gap at the end
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...');
    }

    // Always show last page if it's not the first page
    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }

  const visiblePages = getVisiblePages();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
        title="Previous page"
      >
        PREV
      </button>
      
      <div className="pagination-numbers">
        {visiblePages.map((page, index) => (
          page === '...' ? (
            <span key={`dots-${index}`} className="pagination-dots">...</span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              title={`Go to page ${page}`}
            >
              {page}
            </button>
          )
        ))}
      </div>
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
        title="Next page"
      >
        NEXT
      </button>
    </div>
  )
}

export default Pagination
