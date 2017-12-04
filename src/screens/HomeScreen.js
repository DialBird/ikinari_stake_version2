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
import { connect } from 'react-redux';
import { getToken, getProfile, getNews } from '../common/auth';
import { MyStatus, Separator } from '../components';
import { userChanged, newsChanged } from '../actions';

class HomeScreen extends React.Component {
  componentWillMount() {
    getToken()
      .then(getProfile)
      .then(res => {
        this.props.userChanged(res.data);
      })
      .catch(err => {
        alert('ログイン情報を取得できませんでした: ' + err);
        this.goSignUp();
      });
    getNews()
      .then(res => {
        this.props.newsChanged(res.data);
      })
      .catch(err => alert('ニュースを取得できませんでした: ' + err));
  }

  goSignUp() {
    this.props.navigation.navigate('SignedOut');
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
          <MyStatus user={this.props.user}/>
        </View>
        <View style={{flex: 2}}>
          <FlatList
            data={this.props.news}
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

const mapStateToProps = ({home}) => {
  const { user, news } = home;
  return { user, news };
};

export default connect(mapStateToProps, { userChanged, newsChanged })(HomeScreen);
