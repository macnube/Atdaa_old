/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, NavigatorIOS } from 'react-native';
import configureStore from './configureStore';
import Root from './App/Containers/Root';

const store = configureStore();

export default class Atdaa extends Component {

  render() {
    return <Root store={store} />
  }
}

AppRegistry.registerComponent('Atdaa', () => Atdaa);
