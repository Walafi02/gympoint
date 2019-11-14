import React from 'react';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';
import { Container } from './styles';

export default function Help() {
  return (
    <Container>
      <Header>
        <strong>Pedidos de auxílio</strong>
      </Header>
      <Table template="4fr 1fr">
        <thead>
          <tr>
            <th>ALUNO</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Walafi</td>
            <td className="align-right">
              <button type="button" className="edit">
                responder
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}
