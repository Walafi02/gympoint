import React from 'react';
import Pagination from 'react-paginating';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdFastForward,
  MdFastRewind,
} from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function App({ cPage, loading, handlePageChange, tPages }) {
  return (
    <>
      <Container>
        {tPages > 1 && (
          <Pagination
            total={tPages || 0}
            limit={1}
            pageCount={3}
            currentPage={cPage}
          >
            {({
              pages,
              currentPage,
              hasNextPage,
              hasPreviousPage,
              previousPage,
              nextPage,
              totalPages,
              getPageItemProps,
            }) => (
              <div>
                <button
                  type="button"
                  disabled={!hasPreviousPage || loading}
                  title="Primeiro"
                  {...getPageItemProps({
                    pageValue: 1,
                    onPageChange: handlePageChange,
                  })}
                >
                  <MdFastRewind />
                </button>

                <button
                  type="button"
                  disabled={!hasPreviousPage || loading}
                  title="Anterior"
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: handlePageChange,
                  })}
                >
                  <MdKeyboardArrowLeft />
                </button>

                {pages.map(page => {
                  let activePage = null;
                  if (currentPage === page) {
                    activePage = {
                      backgroundColor: '#ee4d64',
                    };
                  }
                  return (
                    <button
                      type="button"
                      key={page}
                      style={activePage}
                      className={currentPage === page ? 'active' : ''}
                      disabled={loading}
                      {...getPageItemProps({
                        pageValue: page,
                        onPageChange: handlePageChange,
                      })}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={!hasNextPage || loading}
                  title="Próximo"
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: handlePageChange,
                  })}
                >
                  <MdKeyboardArrowRight />
                </button>

                <button
                  type="button"
                  disabled={!hasNextPage || loading}
                  title="Ultimo"
                  {...getPageItemProps({
                    pageValue: totalPages,
                    onPageChange: handlePageChange,
                  })}
                >
                  <MdFastForward />
                </button>
              </div>
            )}
          </Pagination>
        )}
      </Container>
    </>
  );
}

App.propTypes = {
  cPage: PropTypes.number,
  tPages: PropTypes.number,
  loading: PropTypes.bool,
  handlePageChange: PropTypes.func,
};

App.defaultProps = {
  cPage: 0,
  tPages: 0,
  loading: false,
};
