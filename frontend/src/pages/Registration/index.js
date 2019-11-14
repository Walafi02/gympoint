import React from 'react';
// import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';

export default function Registration() {
  return (
    <Container>
      <Header>
        <strong>Gerenciando matrículas</strong>
        <div>
          {/* <Link to="/plan/create"> */}
          <Button
            type="button"
            text="CADASTRAR"
            Icon={MdAdd}
            styledType="primary"
          />
          {/* </Link> */}
        </div>
      </Header>

      <Table template="4fr 2fr 2fr 2fr 2fr 1fr 1fr">
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INÌCIO</th>
            <th>TERMINO</th>
            <th>ATIVA</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>walafi</td>
            <td>start</td>
            <td>12-12-2012</td>
            <td>12-01-2013</td>
            <td>sim</td>
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
