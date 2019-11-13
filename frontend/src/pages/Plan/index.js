import React from 'react';
import { MdAdd } from 'react-icons/md';

import { Container, HeaderPlan, TablePlans } from './styles';

export default function Plan() {
  return (
    <Container>
      <HeaderPlan>
        <strong>Gerenciando Planos</strong>
        <button type="button">
          <MdAdd size={24} color="#fff" /> CADASTRAR
        </button>
      </HeaderPlan>

      <TablePlans>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÂO</th>
            <th>VALOR p/ MÊS</th>
            <th />
            <th />
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Start</td>
            <td>1 mês</td>
            <td>R$ 129,00</td>
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
          <tr>
            <td>Start</td>
            <td>1 mês</td>
            <td>R$ 129,00</td>
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
          <tr>
            <td>Start</td>
            <td>1 mês</td>
            <td>R$ 129,00</td>
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
      </TablePlans>
    </Container>
  );
}
