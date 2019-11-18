import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';
import Container from '~/components/Container';

import history from '~/services/history';
import api from '~/services/api';

export default function Registration() {
  const [registrations, setRegistrations] = useState([]);
  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('registration');
      setRegistrations(
        response.data.map(reg => ({
          ...reg,
          format_start_date: format(
            parseISO(reg.start_date),
            "d 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
          format_end_date: format(
            parseISO(reg.end_date),
            "d 'de' MMMM 'de' yyyy",
            {
              locale: pt,
            }
          ),
        }))
      );
    }
    loadRegistrations();
  }, []);

  function handleEdit(id) {
    history.push(`/registration/edit/${id}`);
  }

  async function handleDelete(id) {
    const { student } = registrations.find(item => item.id === id);
    const r = window.confirm(`Deseja deletar matricula para ${student.name}?`);
    if (r === true) {
      try {
        await api.delete(`/registration/${id}`);
        setRegistrations(registrations.filter(item => item.id !== id));
        toast.success(`Sucesso deletar matricula para ${student.name}.`);
      } catch (error) {
        toast.error(`Error ao deletar matricula.`);
      }
    }
  }

  return (
    <Container maxWidth={1000} minWidth={800}>
      <Header>
        <strong>Gerenciando matrículas</strong>
        <div>
          <Link to="/registration/create">
            <Button
              type="button"
              text="CADASTRAR"
              Icon={MdAdd}
              styledType="primary"
            />
          </Link>
        </div>
      </Header>

      <Table template="3fr 3fr 3fr 3fr 1fr 1fr 1fr">
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
          {registrations.length > 0 ? (
            registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.student.name}</td>
                <td>{registration.plan.title}</td>
                <td>{registration.format_start_date}</td>
                <td>{registration.format_end_date}</td>
                <td>
                  <MdCheckCircle
                    size={24}
                    color={registration.active ? '#42cb59' : '#dddddd'}
                  />
                </td>
                <td className="align-right">
                  <button
                    type="button"
                    className="edit"
                    onClick={() => handleEdit(registration.id)}
                  >
                    editar
                  </button>
                </td>
                <td className="align-right">
                  <button
                    type="button"
                    className="delete"
                    onClick={() => handleDelete(registration.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <td className="text-center">Sem itens na lista</td>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
