import Reactotron from 'reactotron-react-native';
// import { reactotronRedux } from 'reactotron-redux';
// import reactotronSaga from 'reactotron-redux-saga';
import AsyncStorange from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.setAsyncStorageHandler(AsyncStorange)
    .configure({host: '10.10.1.69'})
    .useReactNative()
    // .use(reactotronRedux())
    // .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
