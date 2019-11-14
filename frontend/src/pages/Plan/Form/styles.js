import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const BodyForm = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 12px;

  form {
    div {
      display: flex;
    }
  }
`;

// export const Field = styled.div`
//   display: flex;
//   flex: 1;
//   flex-direction: column;
//   padding-left: 10px;
//   padding-bottom: 12px;

//   label {
//     text-align: left;
//     font-weight: bold;
//     font-size: 14px;
//     text-transform: uppercase;
//     font-family: Roboto-Bold sans-serif;
//     color: #444444;
//   }

//   span {
//     color: #ee4d64;
//     align-self: flex-start;
//     margin-top: 5px;
//     font-weight: bold;
//     font-size: 12px;
//   }

//   input {
//     border: 1px solid rgba(0, 0, 0, 0.2);
//     border-radius: 4px;
//     height: 40px;
//     padding: 7px 10px;
//     font-size: 12px;
//   }
// `;
