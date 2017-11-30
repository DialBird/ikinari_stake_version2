import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { Errors } from '../components';
import { onSignIn, storeToken } from '../common/auth';

class SignInScreen extends React.Component {
  constructor() {
    super();
    this.state = { email: '', password: '', errors: [], showProgress: false };
  }

  onPushSignIn() {
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;
    const session_params = { session: { email, password } };
    this.setState({showProgress: true});
    onSignIn(session_params)
      .then(res => {
        const accessToken = res.data;
        storeToken(accessToken)
          .then(()=>navigate('SignedIn'))
          .catch(err=>alert('storeToken err: ' + err));
        this.setState({showProgress: false});
      })
      .catch(errors=>{
        const formErrors = errors.response.data;
        let errorsArray = [];
        for (let key in formErrors) {
          formErrors[key].map(err=>errorsArray.push(`${key} ${err}`));
        }
        this.setState({errors: errorsArray, showProgress: false});
      });
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <View>
        <Card>
          <FormLabel>Email</FormLabel>
          <FormInput
            placeholder='Email'
            value={email}
            onChangeText={email=>this.setState({email})}
          />
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry
            placeholder='Password'
            value={password}
            onChangeText={password=>this.setState({password})}
          />
          <Errors errors={errors}/>

          <Button
            buttonStyle={{marginTop: 20}}
            backgroundColor='#03A9F4'
            title='SIGN IN'
            onPress={this.onPushSignIn.bind(this)}
          />
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

export default SignInScreen;
