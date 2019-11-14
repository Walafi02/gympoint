import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const BodyForm = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 4px;

  form {
    div {
      display: flex;
    }
  }
`;

export const Field = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 15px;
`;
