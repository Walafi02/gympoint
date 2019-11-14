import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

import history from '~/services/history';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { Container } from './styles';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';

export default function Plan() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');
      setPlans(
        response.data.map(plan => ({
          ...plan,
          formatDuration: `${plan.duration} ${
            plan.duration > 1 ? 'meses' : 'mês'
          }`,
          formatPrice: formatPrice(plan.price),
        }))
      );
    }

    loadPlans();
  }, []);

  function handleEdit(id) {
    history.push(`/plan/edit/${id}`);
  }

  function handleDelete(id) {
    console.tron.log(id);
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando Planos</strong>
        <div>
          <Link to="/plan/create">
            <Button
              type="button"
              text="CADASTRAR"
              Icon={MdAdd}
              styledType="primary"
            />
          </Link>
        </div>
      </Header>

      <Table template="6fr 3fr 3fr 1fr 1fr">
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
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td>{plan.formatDuration}</td>
              <td>{plan.formatPrice}</td>
              <td className="align-right">
                <button
                  type="button"
                  onClick={() => handleEdit(plan.id)}
                  className="edit"
                >
                  editar
                </button>
              </td>
              <td className="align-right">
                <button
                  type="button"
                  onClick={() => handleDelete(plan.id)}
                  className="delete"
                >
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
