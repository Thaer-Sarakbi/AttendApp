import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckboxGroup from './CheckboxGroup'

const FormikControl = (props) => {
const { control, ...rest } = props
switch (control) {
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    default:
      return null
  }
}

const styles = StyleSheet.create({
  container: {}
})

export default FormikControl