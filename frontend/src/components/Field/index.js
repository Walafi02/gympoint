import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function Field({ children }) {
  return <Container>{children}</Container>;
}

Field.propTypes = {
  children: PropTypes.element.isRequired,
};
