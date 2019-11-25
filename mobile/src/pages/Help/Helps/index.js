import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Button from '~/components/Button';

import {
  Container,
  RequestList,
  Request,
  RequestHeader,
  DateText,
  RequestBody,
  RequestText,
} from './styles';

export default function Helps() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const datas = [
      {
        id: 1,
        responded: true,
        date: '2019-11-25T00:00:00.000Z',
        request:
          'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as...',
      },
      {
        id: 2,
        responded: false,
        date: '2019-11-24T00:00:00.000Z',
        request:
          'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as...',
      },
      {
        id: 3,
        responded: true,
        date: '2019-11-23T00:00:00.000Z',
        request:
          'Olá pessoal da academia, gostaria de saber se quando acordar devo ingerir batata doce e frango logo de primeira, preparar as...',
      },
    ];

    setRequests(
      datas.map(d => ({
        ...d,
        dateFormated: formatRelative(parseISO(d.date), new Date(), {
          locale: pt,
        }),
      }))
    );
  }, []);

  return (
    <Container>
      <Button onPress={() => {}}>Novo pedido de auxílio</Button>

      <RequestList
        data={requests}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Request onPress={() => {}}>
            <RequestHeader>
              <Text>Respondida</Text>
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
