import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    position: absolute;
    margin-left: 20px;
  }

  input {
    width: 170px;
    height: 100%;
    padding-left: 35px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 12px;
  }
`;
