import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Table from '~/components/Table';
import SearchBar from '~/components/SearchBar';
import Container from '~/components/Container';
import Pagination from '~/components/Pagination';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadStudent(page = 1) {
    setLoading(true);
    setCurrentPage(page);

    try {
      const { data } = await api.get('students', {
        params: {
          name,
          page,
        },
      });
      setStudents(data.docs);
      setTotalPages(data.pages);
    } catch (error) {
      toast.error(
        error.response.data.error || 'Error, verifique suas permissões'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudent();
  }, [name]); // eslint-disable-line

  function handleEdit(id) {
    history.push(`/student/edit/${id}`);
  }

  async function handleDelete(id) {
    const student = students.find(p => p.id === parseInt(id));
    const r = window.confirm(`Deseja deletar ${student.name}?`);
    if (r === true) {
      try {
        await api.delete(`/students/${id}`);
        loadStudent(
          students.length === 1 && currentPage > 1
            ? currentPage - 1
            : currentPage
        );
        toast.success(`Sucesso ao deletar ${name}.`);
      } catch (error) {
        toast.error(error.response.data.error || 'Error ao deletar Aluno.');
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
          <SearchBar
            Icon={MdSearch}
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
      </Header>

      <Table template="4fr 4fr 2fr 1fr 1fr" countRows={students.length}>
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

      <Pagination
        cPage={currentPage}
        loading={loading}
        handlePageChange={loadStudent}
        tPages={totalPages}
      />
    </Container>
  );
}
