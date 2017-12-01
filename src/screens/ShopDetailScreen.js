import React from 'react';
import { StyleSheet, View } from 'react-native';

class ShopDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.shop = props.navigation.state.params.item;
  }

  static navigationOptions = ({navigation}) => {
    const title = navigation.state.params.item + 'の店舗一覧';
    return { title };
  };

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30
  }
});

export default ShopDetailScreen;
