import React, {useCallback} from 'react';
import "./style.css"

  const Pagination = ({current, total, changePage}) => {
    const handlePageChange = useCallback((e) => {
      if (e.target.tagName === 'BUTTON') {
        changePage(+e.target.textContent);
      }
    }, [changePage]);

    let renderPaginationButtons = [];

    if (current < 3) {
      renderPaginationButtons = (
        <>
          {Array.from({length: 3}, (_, i) => (
            <button
              className={current === i + 1 ? "active" : ""}
              key={i}
            >
              {i + 1}
            </button>
          ))}
          <span>...</span>
          <button>{total}</button>
        </>
      );
    } else if (current === total || current + 1 === total) {
      renderPaginationButtons = (
        <>
          <button>1</button>
          <span>...</span>
          {Array.from({length: 3}, (_, i) => (
            <button
              className={current === total - 2 + i ? "active" : ""}
              key={i}
            >
              {total - 2 + i}
            </button>
          ))}
        </>
      );
    } else {
      renderPaginationButtons = (
        <>
          <button>1</button>
          {current > 3 && <span>...</span>}
          {Array.from({length: 3}, (_, i) => (
            <button
              className={current === current + i - 1 ? "active" : ""}
              key={i}
            >
              {current + i - 1}
            </button>
          ))}
          {current < total - 2 && <span>...</span>}
          <button>{total}</button>
        </>
      );
    }

    return (
      <div className="Pagination" onClick={handlePageChange}>
        {renderPaginationButtons}
      </div>
    );
}
  export default Pagination;



