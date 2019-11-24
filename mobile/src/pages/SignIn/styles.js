import styled from 'styled-components/native';
import {Platform} from 'react-native';

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

// export const Input = styled.TextInput`
//   height: 20px;
//   width: 100px;
//   background: red;
// `;

// export const Button = styled.TouchableOpacity``;
