import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, PermissionsAndroid } from 'react-native';
import firestore from '@react-native-firebase/firestore'

const HomeScreen = (props) => {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
      })
  }, [])

    //how many of them?
    firestore().collection('users').get().then(querySnapshot => {
      //console.log('Total users: ', querySnapshot.size);
  
      querySnapshot.forEach(documentSnapshot => {
        //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });

    //exist or not?
    firestore().collection('users').doc('62w1wfZy09dOKOO2fUvV').get().then(documentSnapshot => {
    //console.log('User exists: ', documentSnapshot.exists);

    if (documentSnapshot.exists) {
      //console.log('User data: ', documentSnapshot.data());
    }
  });

  return (
    <View style={styles.container}>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default HomeScreen