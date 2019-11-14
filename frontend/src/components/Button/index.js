import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from './styles';

export default function Button({ children, onClick, type, ...rest }) {
  return (
    <Btn type={type} onClick={onClick} {...rest}>
      {children}
    </Btn>
  );
}

Button.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
