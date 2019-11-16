import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import history from '~/services/history';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';
import SearchBar from '~/components/SearchBar';
import Container from '~/components/Container';

import api from '~/services/api';
// import { Container } from './styles';

export default function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get('students');
      setStudents(response.data);
    }

    loadStudent();
  }, []);

  async function handleSearchUser(e) {
    if (e.keyCode === 13) {
      console.tron.log(e.target.value);
    }
  }

  function handleEdit(id) {
    history.push(`/student/edit/${id}`);
  }

  function handleDelete(id) {
    console.tron.log(id);
  }
  return (
    <Container>
      <Header>
        <strong>Gerenciando alunos</strong>
        <div>
          <Link to="/student/create">
            <Button
              type="button"
              text="CADASTRAR"
              Icon={MdAdd}
              styledType="primary"
            />
          </Link>
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
          {students.map(student => (
            <tr>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age || 'Não informado'}</td>
              <td className="align-right">
                <button
                  type="button"
                  onClick={() => handleEdit(student.id)}
                  className="edit"
                >
                  editar
                </button>
              </td>
              <td className="align-right">
                <button
                  type="button"
                  onClick={() => handleDelete(student.id)}
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
