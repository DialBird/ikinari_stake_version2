import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

class ShopScreen extends React.Component {
  constructor() {
    super();
    const list = ['東京', '有楽町', '新橋', '浜松町', '田町', '品川', '大崎',
      '五反田', '目黒', '恵比寿', '渋谷', '原宿', '代々木', '新宿', '新大久保',
      '高田馬場', '目白', '池袋', '大塚', '巣鴨', '駒込', '田端', '西日暮里',
      '日暮里', '鶯谷', '上野', '御徒町', '秋葉原', '神田'];
    this.state = { initialData: list, data: list, searchText: '' };
  }

  filterList(text) {
    text = text.toLowerCase();
    const filteredResult = this.state.initialData.filter(item => {
      return item.toLowerCase().match(text);
    });
    this.setState({data: filteredResult, searchText: text});
  }

  onPress(item) {
    this.props.navigation.navigate('ShopDetail', {item});
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={this.filterList.bind(this)}
          value={this.state.searchText}
          lightTheme round
        />
        <ScrollView>
          <List>
            {
              this.state.data.map((item, i) => (
                <ListItem
                  key={i}
                  title={item}
                  onPress={()=>this.onPress(item)}
                />
              ))
            }
          </List>
        </ScrollView>
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

export default ShopScreen;
