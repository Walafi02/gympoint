import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;

  button {
    margin: 2px;
    color: #ee4d64;
    font-family: Roboto-Bold sans-serif;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 6px 12px;
    transition: opacity 0.1s;

    &:hover {
      opacity: 0.7;
    }
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  button.active {
    color: #fff;
  }
`;
