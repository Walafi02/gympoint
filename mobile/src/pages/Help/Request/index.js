import React, {useState} from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import api from '~/services/api';

import Background from '~/components/Background';
import {Container, ButtonSubmit, TextInput} from './styles';

export default function Request({navigation}) {
  const student_id = useSelector(state => state.auth.student_id);

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      await api.post(`/students/${student_id}/help-orders`, {
        question,
      });
      navigation.navigate('Helps', {refresh: true});
    } catch (error) {
      if (error) {
        Alert.alert('Error', error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <TextInput
          autoCapitalize="none"
          keyboardType="default"
          autoCorrect={false}
          placeholder="Inclua seu pedido de auxílio"
          onChangeText={setQuestion}
        />
        <ButtonSubmit
          onPress={handleSubmit}
          enabled={question.length > 0}
          loading={loading}>
          Enviar pedido
        </ButtonSubmit>
      </Container>
    </Background>
  );
}

Request.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={24} color="#000000" />
    </TouchableOpacity>
  ),
  tabBarVisible: false,
});

Request.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
