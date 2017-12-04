import React from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { Errors, Spinner } from '../components';
import {
  nameChanged,
  nicknameChanged,
  newEmailChanged,
  newPasswordChanged,
  newPasswordConfirmChanged,
  signupUser
} from '../actions';

class SignUpScreen extends React.Component {
  onPushSignUp() {
    const {
      name, nickname, newEmail, newPassword, newPasswordConfirm
    } = this.props;
    const user_params = {
      user: {
        name, nickname, email: newEmail, password: newPassword,
        password_confirmation: newPasswordConfirm
      }
    };
    this.props.signupUser(user_params, this.props.navigation);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large'/>;
    }

    return (
      <View>
        <Button
          buttonStyle={{marginTop: 20}}
          backgroundColor='#03A9F4'
          title='SIGN UP'
          onPress={this.onPushSignUp.bind(this)}
        />

        <Button
          buttonStyle={{marginTop: 20}}
          backgroundColor='transparent'
          textStyle={{ color: '#bcbec1' }}
          title='SIGN IN'
          onPress={()=>this.props.navigation.navigate('SignIn')}
        />
      </View>
    );
  }

  render() {
    const {
      name, nickname, newEmail, newPassword, newPasswordConfirm, signupErrors,
      nameChanged, nicknameChanged, newEmailChanged, newPasswordChanged,
      newPasswordConfirmChanged
    } = this.props;
    return (
      <ScrollView>
        <Card>
          <FormLabel>Name</FormLabel>
          <FormInput
            placeholder='Name'
            value={name}
            onChangeText={nameChanged}
          />

          <FormLabel>NickName</FormLabel>
          <FormInput
            placeholder='NickName'
            value={nickname}
            onChangeText={nicknameChanged}
          />

          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder='Email'
            value={newEmail}
            onChangeText={newEmailChanged}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder='Password'
            value={newPassword}
            onChangeText={newPasswordChanged}
          />

          <FormLabel>Password Confirm</FormLabel>
          <FormInput
            secureTextEntry
            placeholder='Password Confirm'
            value={newPasswordConfirm}
            onChangeText={newPasswordConfirmChanged}
          />

          <Errors errors={signupErrors}/>

          {this.renderButton()}
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {
    name, nickname, newEmail, newPassword, newPasswordConfirm, signupErrors, loading
  } = auth;
  return {
    name, nickname, newEmail, newPassword, newPasswordConfirm, signupErrors, loading
  };
};

export default connect(mapStateToProps, {
  nameChanged,
  nicknameChanged,
  newEmailChanged,
  newPasswordChanged,
  newPasswordConfirmChanged,
  signupUser
})(SignUpScreen);
