import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #ee4d64;
  border-radius: 4px;
  margin-top: 10px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-family: Roboto-Bold;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  text-align: left;
`;
