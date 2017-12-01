import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { getToken, getProfile, getNews } from '../common/auth';
import { MyStatus, Separator } from '../components';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, news: [] };
  }

  componentWillMount() {
    getToken()
      .then(getProfile)
      .then(res => {
        this.setState({user: res.data});
      })
      .catch(err => alert('情報を取得できませんでした: ' + err));
    getNews()
      .then(res => {
        this.setState({news: res.data});
      })
      .catch(err => alert('情報を取得できませんでした: ' + err));
  }

  renderHeader() {
    return (
      <View style={styles.listHeader}>
        <Text style={{flex: 1}}>お知らせ</Text>
      </View>
    );
  }

  renderItem({ item }) {
    const { issue, title } = item;
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity style={styles.row} onPress={()=>navigate('InfoDetail', { item })}>
        <View>
          <Text style={styles.rowText}>{issue}</Text>
          <Text style={styles.rowText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(_, rowId) {
    return <Separator rowId={rowId}/>;
  }

  render() {
    const { news } = this.state;
    return (
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <Image
            style={styles.image}
            source={require('../images/Designed-Bird-Logo.jpg')}
            resizeMode={'cover'}
          />
        </View>
        <View style={{flex: 1}}>
          <MyStatus user={this.state.user}/>
        </View>
        <View style={{flex: 2}}>
          <FlatList
            data={news}
            keyExtractor={item => item.id}
            renderItem={this.renderItem.bind(this)}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      </View>
    );
  }
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    alignSelf: 'center',
    height: height/2
  },
  listHeader: {
    paddingHorizontal: 20,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  row: {
    backgroundColor: '#fff',
    height: 70
  },
  rowText: {
    fontSize: 16,
    padding: 10
  }
});

export default HomeScreen;
