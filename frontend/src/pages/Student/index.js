import React from 'react';
// import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';
import SearchBar from '~/components/SearchBar';
import Container from '~/components/Container';

// import { Container } from './styles';

export default function Student() {
  async function handleSearchUser(e) {
    if (e.keyCode === 13) {
      console.tron.log(e.target.value);
    }
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando alunos</strong>
        <div>
          {/* <Link to="/plan/create"> */}
          <Button
            type="button"
            text="CADASTRAR"
            Icon={MdAdd}
            styledType="primary"
          />
          {/* </Link> */}
          <SearchBar Icon={MdSearch} handleSearch={handleSearchUser} />
        </div>
      </Header>

      <Table template="4fr 4fr 2fr 1fr 1fr">
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Walafi</td>
            <td>Walafif@yahoo.com</td>
            <td>24</td>
            <td className="align-right">
              <button type="button" className="edit">
                editar
              </button>
            </td>
            <td className="align-right">
              <button type="button" className="delete">
                apagar
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
