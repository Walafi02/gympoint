import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.ScrollView``;

export const TextInput = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 15,
  placeholderTextColor: '#999',
  textAlignVertical: 'top',
})`
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  color: #000;
  background: #fff;
  padding-top: 20px;
  margin: 10px 0;
  line-height: 16px;
`;

export const ButtonSubmit = styled(Button)`
  opacity: ${props => (props.enabled ? 1 : 0.6)};
`;
