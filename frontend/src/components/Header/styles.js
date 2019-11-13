import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 34px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      padding-right: 20px;
      margin-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-family: Roboto-Bold;
      font-size: 15px;
      color: #999999;
      text-transform: uppercase;
      font-weight: bold;

      & + a {
        margin-right: 14px;
      }

      &:hover {
        opacity: 0.7;
      }
    }

    .selected {
      color: #444444;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-family: Roboto-Bold;
    font-size: 14px;
    color: #666666;
    text-align: left;
  }

  button {
    font-family: Roboto-Regular;
    font-size: 14px;
    color: #de3b3b;
    text-align: right;
    border: 0;
    background: transparent;

    &:hover {
      opacity: 0.7;
    }
  }
`;
