import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { onSignOut } from '../common/auth';

class RankScreen extends React.Component {
  onPushSignOut() {
    const { navigate } = this.props.navigation;
    onSignOut()
      .then(()=>navigate('SignedOut'))
      .catch(err=>alert('SignOut Err: ' + err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          buttonStyle={{marginTop: 20}}
          backgroundColor='#FFA9F4'
          title='SIGN OUT'
          onPress={this.onPushSignOut.bind(this)}
        />
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

export default RankScreen;
