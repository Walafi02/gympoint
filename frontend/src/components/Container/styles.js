import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: ${props => props.maxWidth || 800}px;
  min-width: ${props => props.minWidth || 600}px;
  margin: 0 auto;
`;
