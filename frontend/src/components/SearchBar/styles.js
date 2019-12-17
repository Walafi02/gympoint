import styled from 'styled-components';

export const Container = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;

  svg {
    position: absolute;
    margin-left: 20px;
  }

  input {
    width: 170px;
    padding: 7px 10px 7px 35px;
    align-items: center;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 2px;
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
    min-height: 38px;
    outline: 0 !important;
    transition: all 100ms;
    box-sizing: border-box;
  }

  input:focus {
    border: 2px solid #2684ff;
  }
`;
