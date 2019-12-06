import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;

  button {
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 8px;
  }

  button:hover {
    opacity: 0.8;
  }

  button > svg {
    font-size: 30px;
    color: #ee4d64;
  }

  strong {
    font-size: 20px;
    color: #ee4d64;
  }
`;
