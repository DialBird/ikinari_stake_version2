import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  CouponScreen,
  HomeScreen,
  OthersScreen,
  RankScreen,
  ShopScreen,
  SignInScreen,
  SignUpScreen
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

const SignedIn = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'ホーム',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name={'home'}
          size={30}
          style={{ color: tintColor }}
        />
      )
    }
  },
  Rank: {
    screen: RankScreen,
    navigationOptions: {
      tabBarLabel: 'ランキング',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name={'crown'}
          size={30}
          style={{ color: tintColor }}
        />
      )
    }
  },
  Shop: {
    screen: ShopScreen,
    navigationOptions: {
      tabBarLabel: '店舗情報',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name={'store'}
          size={30}
          style={{ color: tintColor }}
        />
      )
    }
  },
  Coupon: {
    screen: CouponScreen,
    navigationOptions: {
      tabBarLabel: 'クーポン',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name={'ticket-percent'}
          size={30}
          style={{ color: tintColor }}
        />
      )
    }
  },
  Others: {
    screen: OthersScreen,
    navigationOptions: {
      tabBarLabel: 'その他',
      tabBarIcon: ({tintColor}) => (
        <Icon
          name={'dots-horizontal'}
          size={30}
          style={{ color: tintColor }}
        />
      )
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
