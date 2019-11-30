import styled from 'styled-components/native';
import {Platform} from 'react-native';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch; /*Vai tentar ocupar toda a largura possivel*/
  margin-top: 40px;
`;

export const ButtonSubmit = styled(Button)`
  opacity: ${props => (props.enabled ? 1 : 0.6)};
`;
