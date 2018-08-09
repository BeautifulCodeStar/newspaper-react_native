
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './src/reducers';
import Routes from './src/pages/Router.js';

const store = createStore(RootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Routes />
      </Provider>
    );
  }
}
