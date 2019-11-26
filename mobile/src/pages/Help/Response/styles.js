import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
  flex: 1;
  background: #f5f5f5;
  padding: 15px 10px;
`;

export const Container = styled.SafeAreaView``;

export const ResponseBody = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  background: #fff;
  padding: 12px 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const ResponseTitleView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0;
`;

export const Title = styled.Text`
  font-family: Roboto-Bold sans-serif;
  font-size: 14px;
  color: #444444;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Date = styled.Text`
  font-family: Roboto-Regular sans-serif;
  font-size: 14px;
  color: #666666;
`;

export const ResponseView = styled.View``;

export const ResponseText = styled.Text`
  font-family: Roboto-Regular sans-serif;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: left;
  margin-bottom: 8px;
`;
