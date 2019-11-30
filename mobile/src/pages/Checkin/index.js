import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {useSelector} from 'react-redux';

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
  const student_id = useSelector(state => state.auth.student_id);

  const [checkins, setCheckins] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  async function loadCheckins(page = 1, oldCheckins = []) {
    setPages(page);
    try {
      const {data} = await api.get(`/students/${student_id}/checkins`, {
        params: {
          page,
        },
      });
      setTotalPages(data.totalPages);

      let total = data.totalDocs - oldCheckins.length;

      const newCheckins = data.docs.map(checkin => ({
        id: checkin._id,
        title: `Check-in #${total--}`,
        dataFormated: formatRelative(parseISO(checkin.created_at), new Date(), {
          locale: pt,
        }),
      }));

      setCheckins([...oldCheckins, ...newCheckins]);
    } catch (error) {
      if (error.response.data.error) {
        Alert.alert('Error', error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadCheckins();
  }, []); // eslint-disable-line

  function refreshList() {
    loadCheckins();
  }

  function loadMore() {
    if (totalPages !== pages) loadCheckins(pages + 1, checkins);
  }

  async function handleRequestCheckin() {
    try {
      await api.post(`/students/${student_id}/checkins`);
      Alert.alert('Sucesso', 'Check-in Realizado!');
      setLoading(true);
      loadCheckins();
    } catch (error) {
      if (error) {
        Alert.alert('Error', error.response.data.error);
      }
    }
  }

  async function handleCheckin() {
    Alert.alert(
      'Check-in',
      'Deseja realizar um ckeck-in na academia?',
      [{text: 'NÃO'}, {text: 'SIM', onPress: () => handleRequestCheckin()}],
      {cancelable: true}
    );
  }

  return (
    <Container>
      <Button onPress={handleCheckin}>Novo check-in</Button>

      {loading ? (
        <ActivityIndicator color="#ccc" size={24} />
      ) : (
        <CheckinsList
          data={checkins}
          keyExtractor={item => item.id}
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
