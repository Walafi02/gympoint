import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';
import Container from '~/components/Container';
import Pagination from '~/components/Pagination';

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadPlans(page = 1) {
    setLoading(true);
    setCurrentPage(page);

    try {
      const { data } = await api.get('plans', {
        params: {
          page,
        },
      });

      setPlans(
        data.docs.map(plan => ({
          ...plan,
          formatDuration: `${plan.duration} ${
            plan.duration > 1 ? 'meses' : 'mês'
          }`,
          formatPrice: formatPrice(plan.price),
        }))
      );
      setTotalPages(data.pages);
    } catch (error) {
      toast.error(
        error.response.data.error ||
          'Error na criação, verifique suas permissões'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlans();
  }, []); // eslint-disable-line

  function handleEdit(id) {
    history.push(`/plan/edit/${id}`);
  }

  async function handleDelete(id) {
    const { title } = plans.find(item => item.id === id);
    const r = window.confirm(`Deseja deletar o plano ${title}?`);
    if (r === true) {
      try {
        await api.delete(`/plans/${id}`);
        loadPlans(
          plans.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage
        );
        toast.success(`Sucesso ao deleta o plano ${title}.`);
      } catch (error) {
        toast.error(error.response.data.error || 'Error ao deletar plano.');
      }
    }
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

      <Table template="6fr 3fr 3fr 1fr 1fr" countRows={plans.length}>
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

      <Pagination
        cPage={currentPage}
        tPages={totalPages}
        loading={loading}
        handlePageChange={loadPlans}
      />
    </Container>
  );
}
