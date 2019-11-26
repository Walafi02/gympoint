import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';
import {Container, TextInput} from './styles';

export default function NewRequest() {
  return (
    <Container>
      <TextInput placeholder="Inclua seu pedido de auxílio" />
      <Button onPress={() => {}}>Enviar pedido</Button>
    </Container>
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
