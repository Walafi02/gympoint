import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
  padding: 15px 10px;
`;

export const CheckinsList = styled.FlatList.attrs({
  showVerticalScrollIndicator: true,
  contentContainerStyle: {paddingTop: 7},
})``;

export const CheckinItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;

  padding: 10px;
  margin-top: 10px;
`;

export const CheckinTitle = styled.Text`
  font-family: Roboto-Bold sans-serif;
  font-size: 14px;
  color: #444444;
  font-weight: bold;
`;

export const Checkindate = styled.Text`
  font-family: Roboto-Regular sans-serif;
  font-size: 14px;
  color: #666666;
`;
