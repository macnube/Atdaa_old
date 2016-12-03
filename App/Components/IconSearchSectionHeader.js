import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
  },
});

function IconSearchSectionHeader(props) {
  console.log("Props going into IconSearchSectionHeader", props);

  return (
    <View style={props.style}>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  ) 
}

module.exports = IconSearchSectionHeader;