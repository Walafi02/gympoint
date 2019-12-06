import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  color: #444444;

  tr {
    display: grid;
    grid-template-columns: ${props => props.template};
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

  tbody tr.empty-row:hover {
    background: none;
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
