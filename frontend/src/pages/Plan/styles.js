import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

// export const HeaderPlan = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 30px 0;

//   strong {
//     font-family: Roboto-Bold;
//     font-size: 24px;
//     color: #444444;
//   }

//   a {
//     font-family: Roboto-Bold;
//     font-size: 14px;
//     color: #ffffff;
//     text-align: center;
//     background: #ee4d64;
//     font-weight: bold;
//     padding: 4px 10px;
//     border-radius: 4px;

//     display: flex;
//     justify-content: center;
//     align-items: center;

//     svg {
//       margin: 5px 7px 5px 5px;
//     }

//     &:hover {
//       opacity: 0.9;
//     }
//   }
// `;

export const TablePlans = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;

  tr {
    display: grid;
    grid-template-columns: 6fr 3fr 3fr 1fr 1fr;
  }

  thead th {
    text-align: left;
    padding: 12px;

    + th {
      text-align: center;
    }
  }

  tbody td {
    text-align: left;
    padding: 12px;

    + td {
      text-align: center;
    }
  }

  tbody tr:hover {
    background: #f5f5f5;
  }

  button {
    background: transparent;
    border: 0;

    &.edit {
      color: #4d85ee;
    }

    &.delete {
      color: #de3b3b;
    }
  }
`;
