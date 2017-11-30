/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { createRootNavigator } from './Router';
import { isSignedIn } from './common/auth';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { signedIn: false, checkedSignedIn: false };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => {
        this.setState({signedIn: res, checkedSignedIn: true});
      })
      .catch(err => alert('Cant check signedIn: ' + err));
  }

  render() {
    const { signedIn, checkedSignedIn } = this.state;

    if (!checkedSignedIn) return null;

    const Router = createRootNavigator(signedIn);
    return <Router />;
  }
}
