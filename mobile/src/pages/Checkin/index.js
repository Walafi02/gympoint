import React, {useState, useEffect} from 'react';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
// import {View, Text} from 'react-native';

import Button from '~/components/Button';

import {
  Container,
  CheckinsList,
  CheckinItem,
  CheckinTitle,
  Checkindate,
} from './styles';

export default function Checkin() {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    const data = [
      {title: 'Check-in #10', date: '2019-11-25T00:00:00.000Z'},
      {title: 'Check-in #9', date: '2019-11-24T21:00:00.000Z'},
      {title: 'Check-in #8', date: '2019-11-24T20:00:00.000Z'},
      {title: 'Check-in #7', date: '2019-11-24T19:00:00.000Z'},
      {title: 'Check-in #6', date: '2019-11-24T17:00:00.000Z'},
      {title: 'Check-in #5', date: '2019-11-24T16:00:00.000Z'},
      {title: 'Check-in #4', date: '2019-11-23T18:00:00.000Z'},
      {title: 'Check-in #3', date: '2019-11-22T15:00:00.000Z'},
      {title: 'Check-in #2', date: '2019-11-21T14:00:00.000Z'},
      {title: 'Check-in #1', date: '2019-11-20T12:00:00.000Z'},
    ];

    setCheckins(
      data.map(checkin => ({
        ...checkin,
        dataFormated: formatRelative(parseISO(checkin.date), new Date(), {
          locale: pt,
        }),
      }))
    );
  }, []);

  function refreshList() {
    console.tron.log('recarrega');
  }

  function loadMore() {
    console.tron.log('carrega mais itens');
  }

  return (
    <Container>
      <Button onPress={() => {}}>Novo check-in</Button>

      <CheckinsList
        data={checkins}
        keyExtractor={item => item.title}
        onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
        refreshing={false} // Variável que armazena um estado true/false que representa se a lista está atualizando
        onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
        onEndReached={loadMore} // Função que carrega mais itens
        renderItem={({item}) => (
          <CheckinItem>
            <CheckinTitle>{item.title}</CheckinTitle>
            <Checkindate>{item.dataFormated}</Checkindate>
          </CheckinItem>
        )}
      />
    </Container>
  );
}
