import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Table({ children, template, countRows }) {
  return (
    <>
      {countRows > 0 ? (
        <Container template={template}>{children}</Container>
      ) : (
        <div className="text-center">
          <strong>Sem itens na lista</strong>
        </div>
      )}
    </>
  );
}

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  template: PropTypes.string.isRequired,
  countRows: PropTypes.number,
};

Table.defaultProps = {
  countRows: 0,
};
