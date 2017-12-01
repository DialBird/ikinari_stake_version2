import React from 'react';
import { StyleSheet, View } from 'react-native';

export default ({ rowId }) => (
  <View key={rowId} style={styles.separator}/>
);

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  }
});
