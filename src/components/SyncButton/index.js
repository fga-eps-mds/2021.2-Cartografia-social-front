import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const SyncButton = ({visible}) => {
  console.log(visible)
  return visible ? (
    <TouchableOpacity style={styles.button}>
      <Text>Abc</Text>
    </TouchableOpacity>
  ) : null;
};

export default SyncButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});
