import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './styles';

export default function Container({ children, maxWidth, minWidth }) {
  return (
    <Wrapper maxWidth={maxWidth} minWidth={minWidth}>
      {children}
    </Wrapper>
  );
}

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  maxWidth: PropTypes.number,
  minWidth: PropTypes.number,
};
