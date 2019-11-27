import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

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
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadCheckins(page = 1, itens = []) {
    setPages(page);
    try {
      const {data} = await api.get('/students/1/checkins', {
        params: {
          page,
        },
      });

      let total = data.totalDocs - itens.length;

      // console.tron.log(total);
      setCheckins(
        ...itens,
        data.docs.map(d => ({
          id: d._id,
          title: `Check-in #${total--}`,
          dataFormated: formatRelative(parseISO(d.created_at), new Date(), {
            locale: pt,
          }),
        }))
      );
    } catch (error) {
      // console.tron.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.tron.log(checkins);
  }, [checkins]); // eslint-disable-line

  useEffect(() => {
    loadCheckins();
  }, []); // eslint-disable-line

  function refreshList() {
    // setPage(1);
    // setLoading(true);
    loadCheckins();
  }

  function loadMore() {
    console.log(checkins);
    loadCheckins(2, checkins);
  }

  return (
    <Container>
      <Button onPress={() => {}}>Novo check-in</Button>

      {loading ? (
        <ActivityIndicator color="#ccc" size={24} />
      ) : (
        <CheckinsList
          data={checkins}
          keyExtractor={item => String(item.id)}
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
      )}
    </Container>
  );
}
