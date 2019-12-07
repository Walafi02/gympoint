import React from 'react';
import PropTypes from 'prop-types';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container } from './styles';

export default function Pagination({
  currentPage,
  totalPages,
  loading,
  loadItens,
}) {
  function handlePrev() {
    loadItens(currentPage - 1);
  }

  function handleNext() {
    loadItens(currentPage + 1);
  }

  return (
    <>
      {totalPages > 1 && (
        <Container>
          <button
            type="button"
            disabled={currentPage === 1 || loading}
            onClick={handlePrev}
          >
            <MdKeyboardArrowLeft />
          </button>
          <strong>{currentPage}</strong>
          <button
            type="button"
            disabled={currentPage === totalPages || loading}
            onClick={handleNext}
          >
            <MdKeyboardArrowRight />
          </button>
        </Container>
      )}
    </>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  loading: PropTypes.bool,
  loadItens: PropTypes.func,
};

Pagination.defaultProps = {
  currentPage: 0,
  totalPages: 0,
  loading: false,
};
