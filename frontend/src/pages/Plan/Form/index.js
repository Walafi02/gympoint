import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { MdAdd } from 'react-icons/md';

import HeaderView from '~/components/HeaderView';
import Button from '~/components/Button';
import ButtonLink from '~/components/ButtonLink';

import api from '~/services/api';

import { Container, BodyForm, Field } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatorio'),
  duration: Yup.number()
    .required('A duração é obrigatoria')
    .typeError('Insira uma duração válida'),
  price: Yup.number()
    .required('O Preço é obrigatorio')
    .typeError('Insira um preço válido'),
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
      <HeaderView>
        <strong>titulo</strong>

        <div>
          <Button type="button" background="#ee4d64">
            <MdAdd size={24} color="#fff" /> CADASTRAR
          </Button>
          <Button type="button">
            <MdAdd size={24} color="#fff" /> Salvar
          </Button>
        </div>
      </HeaderView>

      <BodyForm>
        <Form onSubmit={handleSubmit} initialData={plan} schema={schema}>
          <Field>
            <Input label="TÍTULO DO PLANO" name="title" />
          </Field>
          <div>
            <Field>
              <Input label="DURAÇÃO (em meses)" name="duration" type="number" />
            </Field>
            <Field>
              <Input label="PREÇO MENSAL" name="price" type="number" />
            </Field>
            <Field>
              <Input label="PREÇO TOTAL" name="total" type="number" disabled />
            </Field>
          </div>

          {/* <button type="submit">Salvar</button> */}
        </Form>
      </BodyForm>
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
