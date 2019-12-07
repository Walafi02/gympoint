import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function SearchBar({ Icon, ...rest }) {
  return (
    <Container htmlFor="search">
      <Icon size={24} color="#aaa" />
      <input type="text" name="search" {...rest} />
    </Container>
  );
}

SearchBar.propTypes = {
  Icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};
