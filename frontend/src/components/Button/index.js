import React from 'react';
import PropTypes from 'prop-types';

import { Btn } from './styles';

export default function Button({ type, Icon, text, ...rest }) {
  return (
    <Btn type={type} {...rest}>
      {Icon && <Icon size={24} color="#fff" />} <span>{text || 'button'}</span>
    </Btn>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  Icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.bool,
  ]),
};

Button.defaultProps = {
  Icon: false,
};
