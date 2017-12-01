import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { ButtonGroupItem, Separator } from '../components';
import { getToken, getProfile, getUsers } from '../common/auth';

class RankScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0, user: {}, users: [], refreshing: false };
  }

  componentWillMount() {
    this.getUserData(this.state.selectedIndex);
    getToken()
      .then(getProfile)
      .then(res => {
        this.setState({user: res.data});
      })
      .catch(err => alert('情報を取得できませんでした: ' + err));
  }

  getUserData(selectedIndex) {
    const type = ['', 'name', 'point'][selectedIndex];
    getUsers(type)
      .then(res => {
        this.setState({users: res.data, refreshing: false});
      })
      .catch(err => {
        this.setState({data: [], refreshing: false});
        alert('Error occured: ' + err.response.data);
      });
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
    this.getUserData(selectedIndex);
  }

  renderItem({ item, index }) {
    const { name, point } = item;
    return (
      <View style={styles.listViewRow}>
        <Text style={{flex: 1}}>第{parseInt(index) + 1}位</Text>
        <Text style={{flex: 2}}>{name}</Text>
        <Text style={{flex: 1}}>{point}</Text>
      </View>
    );
  }

  renderSeparator(_, rowId) {
    return <Separator rowId={rowId}/>;
  }

  renderHeader() {
    const Component1 = () => (
      <ButtonGroupItem iconName='crown' title='総合'/>
    );
    const Component2 = () => (
      <ButtonGroupItem iconName='account' title='名前順'/>
    );
    const Component3 = () => (
      <ButtonGroupItem iconName='crown' title='マイレージ順'/>
    );
    const buttons = [
      { element: Component1 },
      { element: Component2 },
      { element: Component3 }
    ];
    return (
      <View style={styles.header}>
        <View style={{paddingVertical: 5}}>
          <ButtonGroup
            selectedIndex={this.state.selectedIndex}
            onPress={this.updateIndex.bind(this)}
            buttons={buttons}
            containerStyle={styles.buttonGroup}
          />
        </View>
        <View style={styles.listHeader}>
          <Text style={{flex: 1, color: '#fff'}}>順位</Text>
          <Text style={{flex: 2, color: '#fff'}}>名前</Text>
          <Text style={{flex: 1, color: '#fff'}}>マイレージ</Text>
        </View>
      </View>
    );
  }

  onRefresh() {
    this.setState({refreshing: true}, ()=>{
      this.getUserData(this.state.selectedIndex);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.users}
          keyExtractor={item => item.id}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
          ListHeaderComponent={this.renderHeader.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    paddingTop: 40,
    backgroundColor: 'pink'
  },
  buttonGroup: {
    height: 100,
    marginVertical: 30
  },
  listHeader: {
    paddingHorizontal: 20,
    backgroundColor: '#333',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listViewRow: {
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default RankScreen;
