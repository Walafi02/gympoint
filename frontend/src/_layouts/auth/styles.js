import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: #ee4d64;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 320px;
  background: #fff;
  border-radius: 4px;
  padding: 30px 20px;

  text-align: center;

  img {
    width: 120px;
    height: 70px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;

    label {
      text-align: left;
      font-weight: bold;
      font-size: 14px;
      text-transform: uppercase;
      font-family: Roboto-Bold;
      color: #444444;
      margin-top: 15px;
    }

    span {
      color: #ee4d64;
      align-self: flex-start;
      margin-top: 5px;
      font-weight: bold;
      font-size: 12px;
    }

    input {
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      height: 40px;
      padding: 7px 10px;
      font-size: 12px;
    }

    button {
      margin-top: 15px;
      height: 40px;
      background: #ee4d64;
      color: #fff;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      font-size: 14px;

      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
    }
  }
`;
