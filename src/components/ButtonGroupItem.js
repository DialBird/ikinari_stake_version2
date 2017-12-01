import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({ iconName, title }) => (
  <View style={styles.container}>
    <Icon
      name={iconName}
      size={50}
    />
    <Text style={styles.text}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
});
