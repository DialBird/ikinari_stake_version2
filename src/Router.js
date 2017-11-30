import { StackNavigator } from 'react-navigation';
import {
  SignUpScreen,
  SignInScreen,
  HomeScreen
} from './screens';

const SignedOut = StackNavigator({
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerTitle: 'サインアップ'
    }
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerTitle: 'サインイン'
    }
  }
});

const SignedIn = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'ホーム',
      gesturesEnabled: false
    }
  }
});

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator({
    SignedOut: {
      screen: SignedOut,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SignedIn: {
      screen: SignedIn,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  }, {
    headerMode: 'none',
    initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
  });
};
