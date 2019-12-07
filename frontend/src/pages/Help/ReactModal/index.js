import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { Container, FormHelp } from './styles';

import Field from '~/components/Field';
import Button from '~/components/Button';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    bottom: 'auto',
    minWidth: '500px',
    maxHeight: '500px',
    transform: 'translate(-50%, -50%)',
    overflow: 'scroll',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.6)',
  },
};

const schema = Yup.object().shape({
  answer: Yup.string().required('Insira uma resposta para o aluno.'),
});

export default function HelpModal({
  modalIsOpen,
  closeModal,
  help,
  handleSubmit,
}) {
  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <FormHelp onSubmit={handleSubmit} schema={schema}>
          <strong>
            PERGUNTA DE <span>{help.student}</span>
          </strong>
          <p>{help.question}</p>

          <Field>
            <Input name="answer" label="SUA RESPOSTA" multiline />
          </Field>

          <Button type="submit" text="Responder o aluno" styledType="primary" />
        </FormHelp>
      </Modal>
    </Container>
  );
}

HelpModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  help: PropTypes.object.isRequired,
};
