import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import firestore from '@react-native-firebase/firestore'
import FormButton from '../components/FormButton';
import { AuthContext } from '../context/AuthContext';
import { Avatar } from 'react-native-paper'
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = (props) => {
  const { user, logout } = useContext(AuthContext)
  const [userData, setUserData] = useState()
  
  useEffect(() => {
    firestore().collection('users').get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data().email);
        if(user.email === documentSnapshot.data().email){
           //console.log(documentSnapshot.id, documentSnapshot.data())
           firestore().collection('users').doc(documentSnapshot.id.toString()).onSnapshot(doc => {
            //console.log(doc.data())
            setUserData(doc.data())
          })
        }
      });
    });
  }, [])

if(userData){
  return(
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={ require('../../assets/kuala.jpg')} style={styles.image} />
        </View>
        <Avatar.Image source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }} size={80} style={styles.avatar} />
        <View style={styles.textCont}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.nameUser}>{userData.name}</Text>
          <Text style={styles.place}>Email</Text>
          <Text style={styles.nameUser}>{userData.email}</Text>
          <Text style={styles.place}>Place</Text>
          <Text style={styles.nameUser}>{userData.place}</Text>
          <Text style={styles.place}>QR Code</Text>
          <View style={styles.qrcode}>
            <QRCode size={250}>{userData.QRCode}</QRCode>
          </View>
          <Text style={styles.qrtext}>{userData.QRCode}</Text>
          <FormButton buttonTitle='Logout' onPress={() => logout()} />
          <View style={styles.space}></View>
        </View>
      </View>
    </ScrollView>
  )
}

return(
  <View>
    <Text>Loading</Text>
  </View>
)

}
const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    //height: 100
  },
  image:{
    height: 200,
    width: '100%'
  },
  avatar:{
    position: 'relative',
    top: -40,
    alignSelf: 'center'
  },
  textCont:{
    paddingHorizontal: 15
  },
  name:{
    color: '#7986CB',
    fontSize: 20
  },
  nameUser:{
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5
  },
  place:{
    color: '#7986CB',
    fontSize: 20,
    marginTop: 13
  },
  qrcode:{
    marginTop: 20,
    alignItems: 'center'
  },
  qrtext:{
    marginLeft: 40,
    fontSize: 15
  },
  space:{
    height: 15
  }
})

export default ProfileScreen