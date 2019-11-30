import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
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
  const student_id = useSelector(state => state.auth.student_id);

  const [requests, setRequests] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);

  const refresh = navigation.getParam('refresh');

  async function loadHelps(page = 1, oldRequests = []) {
    setPages(page);
    try {
      const {data} = await api.get(`/students/${student_id}/help-orders`, {
        params: {
          page,
        },
      });
      setTotalPages(data.pages);

      const newRequests = data.docs.map(request => ({
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
    loadHelps();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      loadHelps();
    }
  }, [refresh]); // eslint-disable-line

  function handleSelectHelp(help) {
    navigation.navigate('Response', {help});
  }

  function handleNewRequest() {
    navigation.navigate('NewRequest');
  }

  function refreshList() {
    loadHelps();
  }

  function loadMore() {
    if (totalPages !== pages) loadHelps(pages + 1, requests);
  }

  return (
    <Container>
      <Button onPress={handleNewRequest}>Novo pedido de auxílio</Button>

      {loading ? (
        <ActivityIndicator color="#ccc" size={24} />
      ) : (
        <RequestList
          data={requests}
          keyExtractor={item => String(item.id)}
          onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
          refreshing={false} // Variável que armazena um estado true/false que representa se a lista está atualizando
          onEndReachedThreshold={0.2} // Carrega mais itens quando chegar em 20% do fim
          onEndReached={loadMore} // Função que carrega mais itens
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
      )}
    </Container>
  );
}

Helps.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};
