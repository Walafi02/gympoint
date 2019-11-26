import React from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';
import Background from '~/components/Background';

import {Container, TextInput} from './styles';

export default function NewRequest() {
  return (
    <Background>
      <Container>
        <TextInput
          autoCapitalize="none"
          keyboardType="default"
          autoCorrect={false}
          placeholder="Inclua seu pedido de auxílio"
        />
        <Button onPress={() => {}}>Enviar pedido</Button>
      </Container>
    </Background>
  );
}

NewRequest.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={24} color="#000000" />
    </TouchableOpacity>
  ),
});
