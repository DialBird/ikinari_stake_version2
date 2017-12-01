import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default ({ user }) => {
  const { name, point } = user;
  return (
    <View style={styles.myStatusContainer}>
      <Text style={{color: '#fff'}}>{name} さんの現在のマイレージ</Text>
      <Text style={{fontSize:24, color:'#fff'}}>{point}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  myStatusContainer: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  }
});
