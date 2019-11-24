import styled from 'styled-components/native';

export const Container = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  padding: 0 15px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-size: 15px;
  /* margin-left: 10px; */
  color: rgba(0, 0, 0, 0.8);
`;
