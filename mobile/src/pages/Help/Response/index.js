import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

export default function Response() {
  return (
    <View>
      <Text>Response</Text>
    </View>
  );
}

Response.navigationOptions = ({navigation}) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        // navigation.navigate('Dashboard');
      }}>
      <Icon name="chevron-left" size={24} color="#aaa" />
    </TouchableOpacity>
  ),
});
