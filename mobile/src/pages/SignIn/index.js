import React, {useState} from 'react';
import {Image} from 'react-native';

import Button from '~/components/Button';
import Input from '~/components/Input';

import logo from '~/assets/logo.png';
import {Container, Form} from './styles';

export default function SignIn() {
  const [id, setId] = useState(null);
  function handleSubmit() {
    console.log(`envia ${id}`);
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
        <Button onPress={handleSubmit}>Entrar no sistema</Button>
      </Form>
    </Container>
  );
}
