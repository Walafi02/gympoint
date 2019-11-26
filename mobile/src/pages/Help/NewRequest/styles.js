import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
  padding: 15px 10px;
`;

export const TextInput = styled.TextInput.attrs({
  // placeholderTextColor: '#999',
  multiline: true,
})`
  height: 45px;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 0 20px;
  color: #000;
  background: #fff;

  /* padding-top: 20px; */
  /* margin-top: 20px; */
  height: 100px;
  line-height: 16px;
`;
