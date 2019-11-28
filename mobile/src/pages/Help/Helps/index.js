import React, {useState, useEffect} from 'react';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import api from '~/services/api';

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
  const student_id = 1;
  const [requests, setRequests] = useState([]);

  async function loadHelps(page = 1, oldRequests = []) {
    try {
      const {data} = await api.get(`/students/${student_id}/help-orders`);

      const newRequests = data.rows.map(request => ({
        id: request.id,
        dateFormated: formatRelative(parseISO(request.createdAt), new Date(), {
          locale: pt,
        }),
        question: request.question,
        answer: request.answer ? request.answer : false,
        answerDateFormated: request.answer
          ? formatRelative(parseISO(request.answer_at), new Date(), {
              locale: pt,
            })
          : null,
      }));
      setRequests([...oldRequests, ...newRequests]);

      console.tron.log(newRequests);
    } catch (error) {
      console.tron.error(error);
    }
  }

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

    loadHelps();

    // setRequests(
    //   datas.map(date => ({
    //     ...date,
    //     dateFormated: formatRelative(parseISO(date.date), new Date(), {
    //       locale: pt,
    //     }),
    //   }))
    // );
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
            enabled={!!item.answer}>
            <RequestHeader>
              <ResponseView>
                <ResponseIcon
                  name="check-circle"
                  size={20}
                  responded={item.answer}
                />
                <ResponseText responded={item.answer}>
                  {item.answer ? 'Respondida' : 'Sem resposta'}
                </ResponseText>
              </ResponseView>
              <DateText>{item.dateFormated}</DateText>
            </RequestHeader>
            <RequestBody>
              <RequestText>{item.question}</RequestText>
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
