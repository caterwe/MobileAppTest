import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './redux/Reducer';
import AppLanding from './screens/AppLanding';


const store = createStore(Reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppLanding/>
      </Provider>
    );
  }
}