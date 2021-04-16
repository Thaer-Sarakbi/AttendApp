import auth from '@react-native-firebase/auth'
import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [qrCode, setQrCode] = useState('')
  const [error, setError] = useState({text: '', exist: null})
  const [regError, setRegError] = useState({text: '', exist: null})
  //console.log(rtId)
 
  if(user){
    firestore().collection('users').get().then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        if(user.email === documentSnapshot.data().email){
          //console.log(documentSnapshot.data())
          setUserId(documentSnapshot.id)
          setUserName(documentSnapshot.data().name)
          setQrCode(documentSnapshot.data().QRCode)
          setAdmin(documentSnapshot.data().admin)
        }
      })
    })
  }

  return (
    <AuthContext.Provider
      value={{ 
        user,
        setUser,
        error,
        regError,
        userId,
        userName,
        admin,
        qrCode,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            setError({exist: false})
          } catch (e) {
            console.log(e);
            setError({text: e.toString(), exist: true})
          }
        },
        register: async (name, email, password, location) => {
          const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
                serialLength = 12
          let   rendomSerial = ''
          for(let i = 0; i < serialLength; i = i + 1){
            let randomNumber = Math.floor(Math.random() * chars.length)
            rendomSerial += chars.substring(randomNumber, randomNumber + 1)
          }
          
          try {
            await auth().createUserWithEmailAndPassword(email, password);
            await firestore().collection('users').add({
              name,
              email,
              password,
              place: location,
              QRCode: rendomSerial
            })
            setRegError({exist: false})
          } catch (e) {
            //console.log(e);
            setRegError({text: e.toString(), exist: true})
          }
 
          //realtime
          const newReference = database().ref('/users').push();
          setRtId(newReference.key)
          newReference.set({
            name,
            email,
            password,
            place: location,
            QRCode: rendomSerial
          })
          //.then(() => console.log('Data updated.'));
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
