import React from 'react';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { Container } from './styles';

export default function Pagination() {
  return (
    <Container>
      <button type="button">
        <MdKeyboardArrowLeft />
      </button>
      <strong>0</strong>
      <button type="button">
        <MdKeyboardArrowRight />
      </button>
    </Container>
  );
}
