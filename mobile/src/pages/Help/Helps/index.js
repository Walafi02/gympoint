import React, {useState, useEffect} from 'react';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import Button from '~/components/Button';

import {
  Container,
  RequestList,
  Request,
  RequestHeader,
  DateText,
  RequestBody,
  RequestText,
  ResponseView,
  ResponseIcon,
  ResponseText,
} from './styles';

export default function Helps({navigation}) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const datas = [
      {
        id: 1,
        date: '2019-11-25T00:00:00.000Z',
        request:
          'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as...',
        response:
          'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as...',
      },
      {
        id: 2,
        date: '2019-11-24T00:00:00.000Z',
        request:
          'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as...',
      },
      {
        id: 3,
        date: '2019-11-23T00:00:00.000Z',
        request:
          'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as...',
        response:
          'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as...',
      },
    ];

    setRequests(
      datas.map(date => ({
        ...date,
        dateFormated: formatRelative(parseISO(date.date), new Date(), {
          locale: pt,
        }),
      }))
    );
  }, []);

  function handleSelectHelp(help) {
    navigation.navigate('Response', {help});
  }

  function handleNewRequest() {
    navigation.navigate('NewRequest');
  }

  return (
    <Container>
      <Button onPress={handleNewRequest}>Novo pedido de auxílio</Button>

      <RequestList
        data={requests}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Request
            onPress={() => handleSelectHelp(item)}
            enabled={!!item.response}>
            <RequestHeader>
              <ResponseView>
                <ResponseIcon
                  name="check-circle"
                  size={20}
                  responded={item.response || false}
                />
                <ResponseText responded={item.response || false}>
                  {item.response ? 'Respondida' : 'Sem resposta'}
                </ResponseText>
              </ResponseView>
              <DateText>{item.dateFormated}</DateText>
            </RequestHeader>
            <RequestBody>
              <RequestText>{item.request}</RequestText>
            </RequestBody>
          </Request>
        )}
      />
    </Container>
  );
}

Helps.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
