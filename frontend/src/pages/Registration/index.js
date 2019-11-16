import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

// import { Container } from './styles';

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
      setRegistrations(response.data);
    }
    loadRegistrations();
  }, []);

  function handleEdit(id) {
    history.push(`/registration/edit/${id}`);
  }

  function handleDelete(id) {
    console.tron.log(id);
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
          {registrations.map(registration => (
            <tr key={registration.id}>
              <td>{registration.student.name}</td>
              <td>{registration.plan.title}</td>
              <td>{registration.start_date}</td>
              <td>{registration.end_date}</td>
              <td>{registration.active ? 'sim' : 'não'}</td>
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
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
