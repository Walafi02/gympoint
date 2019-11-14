import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LinkButton } from './styles';

export default function ButtonLink({ children, to, background }) {
  return (
    <LinkButton to={to} background={background}>
      {children}
    </LinkButton>
  );
}

ButtonLink.propTypes = {
  children: PropTypes.element.isRequired,
  to: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};
