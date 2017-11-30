import React from 'react';
import { ScrollView } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { Errors } from '../components';
import { onSignUp, storeToken } from '../common/auth';

class SignUpScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      nickname: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: [],
      showProgress: false
    };
  }

  onPushSignUp() {
    const { navigate } = this.props.navigation;
    const { name, nickname, email, password, password_confirmation } = this.state;
    const user_params = {
      user: { name, nickname, email, password, password_confirmation }
    };
    this.setState({showProgress: true});
    onSignUp(user_params)
      .then(res => {
        console.log(res);
        const accessToken = res.data;
        storeToken(accessToken)
          .then(()=>{console.log('come');navigate('SignedIn');})
          .catch(err=>alert('storeToken Err: ' + err));
        this.setState({showProgress: false});
      })
      .catch(errors => {
        const formErrors = errors.response.data;
        let errorsArray = [];
        for (let key in formErrors) {
          formErrors[key].map(err=>errorsArray.push(`${key} ${err}`));
        }
        this.setState({errors: errorsArray, showProgress: false});
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { name, nickname, email, password, password_confirmation, errors } = this.state;
    return (
      <ScrollView>
        <Card>
          <FormLabel>Name</FormLabel>
          <FormInput
            placeholder='Name'
            value={name}
            onChangeText={name=>this.setState({name})}
          />
          <FormLabel>NickName</FormLabel>
          <FormInput
            placeholder='NickName'
            value={nickname}
            onChangeText={nickname=>this.setState({nickname})}
          />
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
          <FormLabel>Password Confirm</FormLabel>
          <FormInput
            secureTextEntry
            placeholder='Password Confirm'
            value={password_confirmation}
            onChangeText={password_confirmation=>this.setState({password_confirmation})}
          />
          <Errors errors={errors}/>

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
            onPress={()=>navigate('SignIn')}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default SignUpScreen;
