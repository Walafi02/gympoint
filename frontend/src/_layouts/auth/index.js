import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

export default function auth({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

auth.propTypes = {
  children: PropTypes.element.isRequired,
};
