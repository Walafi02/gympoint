import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container,
  ResponseBody,
  ResponseTitleView,
  Title,
  Date,
  ResponseView,
  ResponseText,
} from './styles';
import Background from '~/components/Background';

export default function Response({navigation}) {
  const help = navigation.getParam('help');

  return (
    <Background>
      <Container>
        <ResponseBody>
          <ResponseTitleView>
            <Title>Pergunta</Title>
            <Date>{help.dateFormated}</Date>
          </ResponseTitleView>
          <ResponseView>
            <ResponseText>{help.question}</ResponseText>
          </ResponseView>

          <ResponseTitleView>
            <Title>Resposta</Title>
            <Date>{help.answerDateFormated}</Date>
          </ResponseTitleView>
          <ResponseView>
            <ResponseText>{help.answer}</ResponseText>
          </ResponseView>
        </ResponseBody>
      </Container>
    </Background>
  );
}

Response.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="chevron-left" size={24} color="#000000" />
    </TouchableOpacity>
  ),
});

Response.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
