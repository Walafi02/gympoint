import React, { useState, useEffect } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
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
import ReactSelect from '~/components/ReactSelect';

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
  const [plan, setPlan] = useState('');
  const [endDate, setEndDate] = useState('');
  const [price, setPrice] = useState('');
  const [registration, setRegistration] = useState({
    start_date: null,
    plan_id: null,
    student_id: null,
  });

  const { id } = match.params;

  async function getRegistration() {
    try {
      const { data } = await api.get(`/registration/${id}`);
      setRegistration({
        ...data,
        start_date: parseISO(data.start_date),
      });
    } catch (error) {
      toast.error('Error ao buscar o matrícula, verifique suas permissões');
      history.push(`/registration`);
    }
  }

  async function getStudent(student_id, setName) {
    const { data } = await api.get(`students/${student_id}`);
    setName(data.name);
  }

  async function getPlan(plan_id, setName) {
    const { data } = await api.get(`plans/${plan_id}`);
    setPlan(data);
    setName(data.title);
  }

  async function loadStudents(inputValue) {
    const { data } = await api.get('students', {
      params: {
        name: inputValue,
      },
    });

    return data.docs;
  }

  async function loadPlans(inputValue) {
    const { data } = await api.get('plans', {
      params: {
        title: inputValue,
      },
    });

    return data.docs;
  }

  useEffect(() => {
    if (id) getRegistration();
  }, []); // eslint-disable-line

  useEffect(() => {
    const { start_date } = registration;

    if (plan && plan.duration && plan.price && start_date !== null) {
      setPrice(formatPrice(plan.duration * plan.price));
      setEndDate(format(addMonths(start_date, plan.duration), 'dd/MM/yyyy'));
    } else {
      setPrice(formatPrice(0));
      setEndDate('');
    }
  }, [registration, plan]);// eslint-disable-line

  function handleGoBack() {
    history.push(`/registration`);
  }

  async function handleSubmit({ student_id, plan_id, start_date }) {
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
            <ReactSelect
              label="aluno"
              name="student_id"
              loadInputValue={getStudent}
              loadOptions={loadStudents}
            />
          </Field>
          <div>
            <Field>
              <ReactSelect
                label="Plano"
                name="plan_id"
                loadInputValue={getPlan}
                loadOptions={loadPlans}
                setPlan={setPlan}
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
