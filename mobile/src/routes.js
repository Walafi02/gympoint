import {createAppContainer, createSwitchNavigator} from 'react-navigation'; // createSwitchNavigator não gera historico
// import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import Checkin from '~/pages/Checkin';
import Help from '~/pages/Help';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: SignIn,
        App: createBottomTabNavigator({
          Checkin,
          Help,
        }),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
