import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkButton = styled(Link)`
  background: ${props => props.background};

  font-family: Roboto-Bold;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  /* background: #ee4d64; */
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin: 5px 7px 5px 5px;
  }

  &:hover {
    opacity: 0.9;
  }
`;
