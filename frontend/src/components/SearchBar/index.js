import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

export default function SearchBar({ Icon, handleSearch }) {
  return (
    <Container for="search">
      <Icon size={24} color="#aaa" />
      <input type="text" name="search" onKeyUp={handleSearch} />
    </Container>
  );
}

SearchBar.propTypes = {
  Icon: PropTypes.element.isRequired,
  handleSearch: PropTypes.func.isRequired,
};
