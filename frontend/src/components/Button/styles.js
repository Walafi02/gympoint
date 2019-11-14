import styled from 'styled-components';

export const Btn = styled.button`
  background: ${props => props.background};

  /* font-family: Roboto-Bold;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
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
  } */

  display: inline-block;
  padding: 6px 12px;
  /* margin-bottom: 0; */
  font-size: 14px;

  /* line-height: 1.42857143; */
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  /* background-image: none; */
  border: 1px solid transparent;
  border-radius: 4px;
`;
