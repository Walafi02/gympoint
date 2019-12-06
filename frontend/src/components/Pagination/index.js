import React from 'react';
import PropTypes from 'prop-types';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container } from './styles';

export default function Pagination({ pages, loading }) {
  return (
    <>
      {pages > 1 && (
        <Container>
          <button type="button" disabled={loading}>
            <MdKeyboardArrowLeft />
          </button>
          <strong>0</strong>
          <button type="button" disabled={loading}>
            <MdKeyboardArrowRight />
          </button>
        </Container>
      )}
    </>
  );
}

Pagination.propTypes = {
  pages: PropTypes.number,
  loading: PropTypes.bool,
};

Pagination.defaultProps = {
  loading: false,
  pages: 0,
};
