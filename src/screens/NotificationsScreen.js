import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../context/AuthContext';
//import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import database from '@react-native-firebase/database';
import { set } from 'react-native-reanimated';

const NotificationsScreen = (props) => {
  const [qr, setQr] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [enable, setEnable] = useState(true)
  
  //console.log(enable)
  const { user, qrCode, rtId } = useContext(AuthContext)
  //const [rtId1, setRtId1] = useState('')

  // useEffect(() => {
  //   if(user.email === 'asad92i@yahoo.com'){
  //     setRtId1('-MMtgSCyxOytYu4KtpEC')
  //   } else if(user.email === 'suren@deglory.com'){
  //     setRtId1('-MMtfamF5pPoYpHlBq4o')
  //   } else if(user.email === 'newwavehotel@gmail.com'){
  //     setRtId1('-MMtgvIDfwdAuxParDEA')
  //   } else if(user.email === 'arumugam@deglory.com'){
  //     setRtId1('-MMthESY_C2eCN-hlV8c')
  //   } else if(user.email === 'pragalathanpanikkar@gmail.com'){
  //     setRtId1('-MMthppXT99cePebyZsk')
  //   } else if(user.email === 'puvaneswary@deglory.com'){
  //     setRtId1('-MMtiAJ0Fq6e1Iw-e1qF')
  //   } else if(user.email === 'reginna@deglory.com'){
  //     setRtId1('-MMtiSpSXht1y9A57dTv')
  //   } else if(user.email === 'veeransamy@degloru.com'){
  //     setRtId1('-MMtiiL4hO0F6vbp9ib5')
  //   } else if(user.email === 'thaer@deglory.com'){
  //     setRtId1('-MMyeh0xg9QVAdzjbB1a')
  //   }
  //   else{
  //     setRtId1('tht')
  //   }

  //  // setUserDet(user)
  // }, [rtId1])

  const onRead = (e) => {
    //console.log(e.data)
    if(qrCode == e.data){
      setQr(e.data)

      Geolocation.getCurrentPosition(info => {
        setLatitude(info.coords.latitude)
        setLongitude(info.coords.longitude)
      }, (err) => {
        // //console.log(err.code, err.message);
        //   setEnable(false)
        //   RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        //     interval: 10000,
        //     fastInterval: 5000,
        //   })
        //     .then((data) => {
        //       setEnable(true)
        //     })
        //     .catch((err) => {
        //       setEnable(true)
        //     });
      }); 
    } else {
      setEnable(false)
      Alert.alert(
        'Failed',
        'Try Again',
        [
          {
            text: 'Ok',
            onPress: () => setEnable(true),
            style: 'cancel'
          }
        ]
      );
    }
  }

  if(qr && latitude && longitude){
    firestore().collection('users').get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().email);
        const currentDate = new Date()
        if(user.email === documentSnapshot.data().email){
           console.log(documentSnapshot.id, documentSnapshot.data())
           firestore().collection(`users/${documentSnapshot.id}/attendance`).add({
            Time: currentDate.toString(),
            latitude,
            longitude
          })
        }
      });
    });

    //realtime
    // const newReference = database().ref(`/users/${rtId1}/attendance`).push();
    // const currentDate = new Date()
    //       newReference.set({
    //         Time: currentDate.toString(),
    //         latitude,
    //         longitude
    //       })
    //       //.then(() => console.log('Data updated.'));

    setTimeout(() => {
      setQr('')
      setLatitude('')
      setLongitude('')
    }, 3000);
    
    return (
      <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
        <LottieView source={require('../../assets/676-done.json')} autoPlay loop />
        <Text style={styles.reg}>Registered</Text>
      </View>
    )
  }
  if(enable){
    return (
      <View>
        <QRCodeScanner
          onRead={onRead}
          style={styles.container}
        />
      </View>
    )
  } else {
    return(
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 100
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  reg:{
    position: 'relative',
    top: 250,
    fontSize: 40,
    fontWeight: "bold",
    fontStyle: 'italic'
  }
})

export default NotificationsScreen