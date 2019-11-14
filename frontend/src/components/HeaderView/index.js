import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function HeaderView({ children }) {
  return <Container>{children}</Container>;
}

HeaderView.propTypes = {
  children: PropTypes.element.isRequired,
};
