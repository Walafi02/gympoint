import React, { useState, useEffect } from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Form, Input, Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';
import history from '~/services/history';
import api from '~/services/api';

import { BodyForm } from './styles';

import Header from '~/components/HeaderView';
import Button from '~/components/Button';
import Container from '~/components/Container';
import Field from '~/components/Field';
import Datepicker from '~/components/Datepicker';

export default function RegistrationForm({ match }) {
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
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
      response.data.map(student => ({ id: student.id, title: student.nome }))
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
  }, [registration]);

  function handleGoBack() {
    history.push(`/registration`);
  }

  return (
    <Container>
      <Header>
        <strong>Cadastro de matrícula</strong>
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
      </Header>

      <BodyForm>
        <Form initialData={registration}>
          <Field>
            <Select
              label="aluno"
              name="student_id"
              value={registration.student_id}
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
              <Input label="Data de termino" name="end_date" disabled />
            </Field>
            <Field>
              <Input label="Valor Final" name="price" disabled />
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
