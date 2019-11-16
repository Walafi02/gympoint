import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function BodyForm({ children }) {
  return <Container>{children}</Container>;
}

BodyForm.propTypes = {
  children: PropTypes.element.isRequired,
};
