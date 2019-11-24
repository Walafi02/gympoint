import React, {forwardRef} from 'react';

import {Container} from './styles';

function Input({...rest}, ref) {
  return <Container {...rest} ref={ref} />;
}

export default forwardRef(Input);
