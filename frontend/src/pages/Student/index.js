import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';
import SearchBar from '~/components/SearchBar';
import Container from '~/components/Container';
import Pagination from '~/components/Pagination';

import api from '~/services/api';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadStudent() {
    setLoading(true);

    try {
      const response = await api.get('students', {
        params: {
          page: 2,
        },
      });
      setStudents(response.data.docs);
    } catch (error) {
      console.tron.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
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

  async function handleDelete(id) {
    const { name } = students.find(p => p.id === parseInt(id));
    const r = window.confirm(`Deseja deletar ${name}?`);
    if (r === true) {
      try {
        await api.delete(`/students/${id}`);
        setStudents(students.filter(item => item.id !== id));

        toast.success(`Sucesso ao deletar ${name}.`);
      } catch (error) {
        toast.error(`Error ao deletar studante.`);
      }
    }
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

      {students.length > 0 ? (
        <>
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
                <tr key={String(student.id)}>
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

          <Pagination pages={1} loading={loading} />
        </>
      ) : (
        <div className="text-center">
          <strong>Sem itens na lista</strong>
        </div>
      )}
    </Container>
  );
}
