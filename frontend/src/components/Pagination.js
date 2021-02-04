import React from 'react';

import './Pagination.scss';

const Pagination = ({ pages, page, selectPage }) => {
  return (
    <div className="pagination row center">
      {[...Array(pages).keys()].map((numPage) => (
        <div
          className={numPage + 1 === page ? 'active' : ''}
          key={`PageNum${numPage + 1}`}
          onClick={() => selectPage(numPage + 1)}>
          {numPage + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
