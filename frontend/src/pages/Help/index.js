import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import api from '~/services/api';

import Header from '~/components/HeaderView';
import Table from '~/components/Table';
import Container from '~/components/Container';
// import { Container } from './styles';

import ReactModal from './ReactModal';

export default function Help() {
  const [helps, setHelps] = useState([]);
  const [helpSelected, setHelpSelected] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function loadingHelp() {
      const response = await api.get('students/help-orders');
      setHelps(response.data);
    }
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
      api.post(`/help-orders/${id}/answer`, { answer });
      setHelps(helps.filter(item => item.id !== id));
      setModalIsOpen(false);
      toast.success(`Sucesso ao response o aluno(a) ${student}`);
    } catch (error) {
      toast.success(`Error ao responder o aluno(a) ${student}`);
    }
    console.tron.log(answer);
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
      <Table template="4fr 1fr">
        <thead>
          <tr>
            <th>ALUNO</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {helps.map(help => (
            <tr>
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
    </Container>
  );
}
