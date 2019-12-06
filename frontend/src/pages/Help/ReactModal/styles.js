import styled from 'styled-components';
import { Form } from '@rocketseat/unform';

export const Container = styled.div``;

export const FormHelp = styled(Form)`
  padding: 10px;

  strong {
    font-family: Roboto-Bold sans-serif;
    font-size: 14px;
    color: #444444;
    text-align: left;

    span {
      text-transform: uppercase;
    }
  }

  p {
    font-family: Roboto-Regular sans-serif;
    font-size: 16px;
    color: #666666;
    line-height: 26px;
    text-align: justify;
  }

  div {
    margin-top: 10px;
    padding-left: 0;
  }

  textarea {
    height: 8em;
    padding: 5px;
    font-family: Roboto-Regular sans-serif;
    font-size: 14px;
  }

  button {
    width: 100%;
    padding: 15px;

    span {
      font-family: Roboto-Bold sans-serif;
      font-size: 16px;
      color: #ffffff;
    }
  }
`;
