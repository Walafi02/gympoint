import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import api from '~/services/api';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatorio'),
  duration: Yup.number().required('A duração é obrigatoria'),
  price: Yup.number().required('O Preço é obrigatorio'),
});

export default function FormPlan({ match }) {
  const { id } = match.params;
  const [plan, setPlan] = useState({
    title: '',
  });

  async function getPlan() {
    try {
      const response = await api.get(`/plans/${id}`);
      setPlan(response.data);
      // console.tron.log(response.data);
    } catch (error) {
      // manda msg de error e volta para a tela anterior
    }
  }

  async function handleSubmit({ title, duration, price }) {
    console.tron.log({ title, duration, price });
  }

  useEffect(() => {
    if (id) getPlan();
  }, []); // eslint-disable-line

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={plan} schema={schema}>
        <Input name="title" />
        <Input name="duration" type="number" />
        <Input name="price" type="number" />

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}

FormPlan.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
