import React, {useState} from 'react';
import {Alert, Image} from 'react-native';
import {useDispatch} from 'react-redux';

import Input from '~/components/Input';

import logo from '~/assets/logo.png';
import {Container, Form, ButtonSubmit} from './styles';
import api from '~/services/api';

import * as auth from '~/store/modules/auth/actions';

export default function SignIn() {
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  async function handleSubmit() {
    setLoading(true);
    try {
      await api.post('/session/students', {
        student_id: id,
      });

      dispatch(auth.signInSuccess(id));
    } catch (error) {
      if (error) Alert.alert('Error', error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <Input
          autoCapitalize="none"
          keyboardType="numeric"
          autoCorrect={false}
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={id}
          onChangeText={setId}
        />
        <ButtonSubmit onPress={handleSubmit} enabled={!!id} loading={loading}>
          Entrar no sistema
        </ButtonSubmit>
      </Form>
    </Container>
  );
}
