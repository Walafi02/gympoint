import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;

  strong {
    font-family: Roboto-Bold;
    font-size: 24px;
    color: #444444;
    padding: 6px 2px;
  }

  div {
    display: flex;

    * {
      margin-left: 10px;
    }
  }
`;
