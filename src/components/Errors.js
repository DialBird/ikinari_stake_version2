import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default (props) => (
  <View>
    {
      props.errors.map((error, i)=>{
        return <Text key={i} style={styles.error}>{error}</Text>;
      })
    }
  </View>
);

const styles = StyleSheet.create({
  error: {
    color: '#f00',
    paddingTop: 10,
    textAlign: 'center'
  }
});
