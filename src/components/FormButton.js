import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';

const FormButton = ({ buttonTitle, ...rest }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <View style={styles.btnTxtWrapper}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        backgroundColor: '#2e64e5',
        padding: 10,
        borderRadius: 20,
        flexDirection: 'row',
      },
      buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Lato-Regular',
      },
      btnTxtWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
})

export default FormButton