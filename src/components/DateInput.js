import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import { DateInput } from 'react-native-date-input';
// import dayjs from 'dayjs';

const DateInputs = ({ value }) => {
    console.log(value)
    const [date, setDate] = useState('');
    let dateInput = null;
  
    const handleChange = (date) => {
      setDate(date);
    };
  
    const focus = () => {
      if (!dateInput) {
        return;
      }
  
      dateInput.focus();
    };

  return (
    <View>
        <input type='date' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {}
})

export default DateInputs