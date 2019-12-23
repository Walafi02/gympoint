import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import api from '~/services/api';

import ReactModal from './ReactModal';
import Header from '~/components/HeaderView';
import Table from '~/components/Table';
import Container from '~/components/Container';
import Pagination from '~/components/Pagination';

export default function Help() {
  const [helps, setHelps] = useState([]);
  const [helpSelected, setHelpSelected] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadingHelp(page = 1) {
    setLoading(true);
    setCurrentPage(page);

    try {
      const { data } = await api.get('students/help-orders', {
        params: {
          page,
        },
      });
      setHelps(data.docs);
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
    loadingHelp();
  }, []);

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal(id) {
    const { question, student } = helps.find(item => item.id === id);

    setHelpSelected({
      id,
      question,
      student: student.name,
    });

    setModalIsOpen(true);
  }

  async function handleSubmit({ answer }) {
    const { id, student } = helpSelected;
    try {
      await api.post(`/help-orders/${id}/answer`, { answer });
      loadingHelp(
        helps.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage
      );
      setModalIsOpen(false);
      toast.success(`Sucesso ao response o aluno(a) ${student}`);
    } catch (error) {
      toast.error(
        error.response.data.error || 'Error, veriique suas permissões'
      );
    }
  }

  return (
    <Container maxWidth={600} minWidth={400}>
      <Header>
        <strong>Pedidos de auxílio</strong>
      </Header>
      <ReactModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        help={helpSelected}
        handleSubmit={handleSubmit}
      />

      <Table template="4fr 1fr" countRows={helps.length}>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {helps.map(help => (
            <tr key={String(help.id)}>
              <td>{help.student.name}</td>
              <td className="align-right">
                <button
                  type="button"
                  className="edit"
                  onClick={() => openModal(help.id)}
                >
                  responder
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
        handlePageChange={loadingHelp}
      />
    </Container>
  );
}
