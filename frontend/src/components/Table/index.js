import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Table({ children, template }) {
  return <Container template={template}>{children}</Container>;
}

Table.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  template: PropTypes.string.isRequired,
};
