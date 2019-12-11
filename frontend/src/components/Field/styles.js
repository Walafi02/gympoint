import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
  padding-bottom: 12px;

  label {
    text-align: left;
    font-weight: bold;
    font-size: 14px;
    text-transform: uppercase;
    font-family: Roboto-Bold sans-serif;
    color: #444444;
  }

  span {
    color: #ee4d64;
    align-self: flex-start;
    margin-top: 5px;
    font-weight: bold;
    font-size: 12px;
  }

  > input,
  > div > div > input {
    padding: 7px 10px;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(0, 0%, 80%);
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    cursor: pointer;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    min-height: 38px;
    outline: 0 !important;
    position: relative;
    -webkit-transition: all 100ms;
    transition: all 100ms;
    box-sizing: border-box;
  }

  > div > div {
    cursor: pointer;
  }

  input:focus {
    border: 2px solid #2684ff;
  }

  input:disabled {
    background: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
`;
