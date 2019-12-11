import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';

import history from '~/services/history';
import { formatPrice } from '~/util/format';

import HeaderView from '~/components/HeaderView';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Field from '~/components/Field';
import BodyForm from '~/components/BodyForm';

import api from '~/services/api';

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
    duration: null,
    price: null,
  });
  const [total, setTotal] = useState(0);

  async function handleSubmit({ title, duration, price }) {
    try {
      const response = id // eslint-disable-line
        ? await api.put(`/plans/${id}`, { title, duration, price })
        : await api.post('/plans', { title, duration, price });

      toast.success('Plano salvo com sucesso');
      history.push(`/plan`);
    } catch (error) {
      toast.error('Error ao salvar o plano, verifique suas permissões');
    }
  }

  function handleGoBack() {
    history.push(`/plan`);
  }

  useEffect(() => {
    async function getPlan() {
      try {
        const { data } = await api.get(`/plans/${id}`);
        setPlan(data);
      } catch (error) {
        toast.error('Error ao buscar o plano, verifique suas permissões');
        history.push(`/plan`);
      }
    }
    if (id) getPlan();
  }, []); // eslint-disable-line

  useEffect(() => {
    const totalPrice = formatPrice(
      plan.duration === null || plan.price === null
        ? 0
        : plan.duration * plan.price
    );
    setTotal(totalPrice);
  }, [plan]);

  return (
    <Container>
      <HeaderView>
        <strong>{id ? 'Edição' : 'Cadastro'} de plano</strong>

        <div>
          <Button
            type="button"
            text="Voltar"
            Icon={MdKeyboardArrowLeft}
            onClick={handleGoBack}
          />
          <Button
            type="submit"
            form="planForm"
            text="SALVAR"
            Icon={MdDone}
            styledType="primary"
          />
        </div>
      </HeaderView>

      <BodyForm>
        <Form
          id="planForm"
          onSubmit={handleSubmit}
          initialData={plan}
          schema={schema}
        >
          <Field classname="space-between">
            <Input label="TÍTULO DO PLANO" name="title" />
          </Field>
          <div>
            <Field>
              <Input
                label="DURAÇÃO (em meses)"
                name="duration"
                type="number"
                min={0}
                onChange={e => setPlan({ ...plan, duration: e.target.value })}
              />
            </Field>
            <Field>
              <Input
                label="PREÇO MENSAL"
                name="price"
                type="number"
                min={0}
                onChange={e => setPlan({ ...plan, price: e.target.value })}
              />
            </Field>
            <Field>
              <Input label="PREÇO TOTAL" name="total" disabled value={total} />
            </Field>
          </div>
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
