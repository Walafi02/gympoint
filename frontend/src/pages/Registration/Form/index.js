import React, { useState, useEffect } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { parseISO, addMonths, format } from 'date-fns';
import * as Yup from 'yup';
import history from '~/services/history';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { BodyForm } from './styles';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Field from '~/components/Field';
import Datepicker from '~/components/Datepicker';

const schema = Yup.object().shape({
  start_date: Yup.date()
    .required('A data inicial é obrigatoria')
    .typeError('Insira uma data'),
  plan_id: Yup.number()
    .required('O plano é obrigatorio')
    .typeError('Insira um plano'),
  student_id: Yup.number()
    .required('O estudante é obrigatorio')
    .typeError('Insira um estudante válido'),
});

export default function RegistrationForm({ match }) {
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [registration, setRegistration] = useState({
    start_date: null,
    plan_id: null,
    student_id: null,
  });

  const { id } = match.params;

  async function loadPlans() {
    const response = await api.get('plans');
    setPlans(response.data);
  }

  async function loadStudents() {
    const response = await api.get('students');
    setStudents(
      response.data.docs.map(student => ({ id: student.id, title: student.name }))
    );
  }

  async function getRegistration() {
    try {
      const response = await api.get(`/registration/${id}`);
      setRegistration({
        ...response.data,
        start_date: parseISO(response.data.start_date),
      });
    } catch (error) {
      toast.error('Error ao buscar o matrícula, verifique suas permissões');
      history.push(`/registration`);
    }
  }

  useEffect(() => {
    loadPlans();
    loadStudents();
    if (id) {
      getRegistration();
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    const { plan_id, start_date } = registration;

    if (plan_id !== null && start_date !== null) {
      const plan = plans.find(p => p.id === parseInt(plan_id)); // eslint-disable-line
      setPrice(formatPrice(plan.duration * plan.price));
      setEndDate(format(addMonths(start_date, plan.duration), 'dd/MM/yyyy'));
    } else {
      setPrice(formatPrice(0));
      setEndDate('');
    }
  }, [registration]);// eslint-disable-line

  function handleGoBack() {
    history.push(`/registration`);
  }

  async function handleSubmit({ student_id, plan_id, start_date }) {
    console.tron.log({
      student_id,
      plan_id,
      start_date,
    });
    try {
      const data = { student_id, plan_id, start_date };
      const response = id // eslint-disable-line
        ? await api.put(`/registration/${id}`, data)
        : await api.post('/registration', data);
      toast.success('Plano salvo com sucesso');
      history.push(`/registration`);
    } catch (error) {
      toast.error('Error ao salvar o plano, verifique suas permissões');
    }
  }

  return (
    <Container>
      <Header>
        <strong>{id ? 'Edição' : 'Cadastro'} de matrícula</strong>
        <div>
          <Button
            type="button"
            text="Voltar"
            Icon={MdKeyboardArrowLeft}
            onClick={handleGoBack}
          />
          <Button
            type="submit"
            form="registrationForm"
            text="SALVAR"
            Icon={MdDone}
            styledType="primary"
          />
        </div>
      </Header>

      <BodyForm>
        <Form
          initialData={registration}
          id="registrationForm"
          onSubmit={handleSubmit}
          schema={schema}
        >
          <Field>
            <Select
              label="aluno"
              name="student_id"
              value={registration.student_id}
              onChange={value =>
                setRegistration({
                  ...registration,
                  student_id: value.target.value,
                })
              }
              options={students}
            />
          </Field>

          <div>
            <Field>
              <Select
                label="Plano"
                name="plan_id"
                value={registration.plan_id}
                onChange={value =>
                  setRegistration({
                    ...registration,
                    plan_id: value.target.value,
                  })
                }
                options={plans}
              />
            </Field>
            <Field>
              <Datepicker
                label="Data de início"
                name="start_date"
                dateFormat="dd/MM/yyyy"
                selected={registration.start_date}
                onChange={value =>
                  setRegistration({ ...registration, start_date: value })
                }
              />
            </Field>
            <Field>
              <Input
                label="Data de termino"
                name="endDate"
                disabled
                value={endDate}
              />
            </Field>
            <Field>
              <Input label="Valor Final" name="price" disabled value={price} />
            </Field>
          </div>
        </Form>
      </BodyForm>
    </Container>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
