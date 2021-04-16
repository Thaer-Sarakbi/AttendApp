import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Field, ErrorMessage } from 'formik'

const CheckboxGroup = (props) => {
  const { label, name, options, ...rest } = props

  return (
    <View className='form-control'>
      <Text>{label}</Text>
      <Field name={name}>
        {({ field }) => {
          return options.map(option => {
            return (
              <React.Fragment key={option.key}>
                <TextInput
                  type='checkbox'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <Text htmlFor={option.value}>{option.key}</Text>
              </React.Fragment>
            )
          })
        }}
      </Field>
      {/* <ErrorMessage component={TextError} name={name} /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {}
})

export default CheckboxGroup