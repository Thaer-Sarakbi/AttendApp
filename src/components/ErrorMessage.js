import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ErrorMessage = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text>ErrorMessage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {}
})

export default ErrorMessage