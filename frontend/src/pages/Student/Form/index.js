import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import history from '~/services/history';
import api from '~/services/api';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Field from '~/components/Field';
import BodyForm from '~/components/BodyForm';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatorio'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('Campo obrigatório'),
  age: Yup.number()
    .positive('Idade deve ser maior que zero')
    .required('Campo obrigatório')
    .typeError('Número inválido'),
  weight: Yup.number()
    .required('Campo obrigatório')
    .typeError('Número inválido'),
  height: Yup.number()
    .required('Campo obrigatório')
    .typeError('Número inválido'),
});

export default function StudentForm({ match }) {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: null,
    height: null,
    weight: null,
  });
  const { id } = match.params;

  useEffect(() => {
    async function getStudent() {
      try {
        const { data } = await api.get(`/students/${id}`);
        setStudent(data);
      } catch (error) {
        toast.error('Error ao buscar o plano, verifique suas permissões');
        history.push(`/student`);
      }
    }

    if (id) getStudent();
  }, []); // eslint-disable-line

  function handleGoBack() {
    history.push(`/student`);
  }

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      const response = id // eslint-disable-line
        ? await api.put(`/students/${id}`, { name, email, age, weight, height })
        : await api.post('/students', { name, email, age, weight, height });
      toast.success('Aluno salvo com sucesso');
      history.push(`/student`);
    } catch (error) {
      toast.error('Error ao salvar o aluno, verifique suas permissões');
    }
  }

  return (
    <Container>
      <Header>
        <strong>{id ? 'Edição' : 'Cadastro'} de alunos</strong>
        <div>
          <Button
            type="button"
            text="Voltar"
            Icon={MdKeyboardArrowLeft}
            onClick={handleGoBack}
          />
          <Button
            type="submit"
            form="studentForm"
            text="SALVAR"
            Icon={MdDone}
            styledType="primary"
          />
        </div>
      </Header>

      <BodyForm>
        <Form
          id="studentForm"
          onSubmit={handleSubmit}
          initialData={student}
          schema={schema}
        >
          <Field>
            <Input label="NOME COMPLETO" name="name" />
          </Field>

          <Field>
            <Input label="ENDEREÇO DE E-MAIL" name="email" type="email" />
          </Field>
          <div>
            <Field>
              <Input label="IDADE" name="age" type="number" min="0" />
            </Field>
            <Field>
              <Input
                label="PESO (em kg)"
                name="weight"
                type="number"
                min="0"
                step="0.01"
              />
            </Field>
            <Field>
              <Input
                label="ALTURA"
                name="height"
                type="number"
                min="0"
                step="0.01"
              />
            </Field>
          </div>
        </Form>
      </BodyForm>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
