import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { Errors, Spinner } from '../components';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class SignInScreen extends React.Component {
  onEmailChange(email) {
    this.props.emailChanged(email);
  }

  onPasswordChange(password) {
    this.props.passwordChanged(password);
  }

  onPushSignIn() {
    const { email, password, navigation } = this.props;
    this.props.loginUser({ email, password, navigation });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large'/>;
    }

    return (
      <Button
        buttonStyle={{marginTop: 20}}
        backgroundColor='#03A9F4'
        title='SIGN IN'
        onPress={this.onPushSignIn.bind(this)}
      />
    );
  }

  render() {
    const { email, password, signinErrors } = this.props;
    return (
      <View style={styles.container}>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder='Email'
            value={email}
            onChangeText={this.onEmailChange.bind(this)}
          />

          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder='Password'
            value={password}
            onChangeText={this.onPasswordChange.bind(this)}
          />

          <Errors errors={signinErrors}/>

          {this.renderButton()}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

const mapStateToProps = ({auth}) => {
  const { email, password, signinErrors, loading } = auth;
  return { email, password, signinErrors, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(SignInScreen);
