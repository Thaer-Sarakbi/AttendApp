import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/Ionicons'
import { Picker } from '@react-native-picker/picker';
 
const ExploreScreen = ({ navigation }) => {
  const { userId, userName, admin } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [data, setData] = useState([])
  const [userIds, setUserIds] = useState(userId)
  const [cueUser, setCurUser] = useState(userName)
  const [place, setPlace] = useState('')
  //console.log(place)
    
  data.sort(function(a, b) {
    var dateA = new Date(a.compTime), dateB = new Date(b.compTime);
    return dateB - dateA ;
  }); 

  let usersList = users.map((user) => {
    return (
      <Picker.Item label={user.name} value={user.name} key={user.id} id={user.id} />
    )
  })
 
  useEffect(() => {   
    firestore().collection('users').get().then(querySnapshot => {
      let users = []
      querySnapshot.forEach(documentSnapshot => {
        //console.log(documentSnapshot.id)
        let obj = Object.create(null)
        obj.name = documentSnapshot.data().name
        obj.id = documentSnapshot.id
        users.push(obj)
      })  
      //console.log(users)
      setUsers(users)
    })  

    firestore().collection('users').doc(`${userIds}`).onSnapshot(doc => {
      //console.log(doc.data().Place)
      setPlace(doc.data().place)
    })
     
          firestore().collection(`users/${userIds}/attendance`).onSnapshot(querySnapshot => {
            let data = []
            
            querySnapshot.forEach(documentSnapshot => {
              const newDate = new Date(documentSnapshot.data().Time)
              //console.log(documentSnapshot.data().Time)

              const day = newDate.getDate()
              const month = newDate.getMonth() + 1
              const year = newDate.getFullYear()
              let fullDate = day + '/' + month + '/' + year
               
              let hours = newDate.getHours()
              let minutes = newDate.getMinutes()
              const seconds = newDate.getSeconds()
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12; // the hour '0' should be '12'
              minutes = minutes < 10 ? '0'+minutes : minutes;
              let fullTime = hours + ':' + minutes + ' ' + ampm
              
             //console.log(obj.time)
             let obj = Object.create(null);
             obj.id = documentSnapshot.id
             obj.date = fullDate
             obj.time = fullTime
             obj.compTime = documentSnapshot.data().Time
             obj.latitude = documentSnapshot.data().latitude
             obj.longitude = documentSnapshot.data().longitude
             //console.log(obj) 
             data.push(obj)
            });
             setData(data)
          });
  }, [userIds])

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Attendance Table</Text>
          {admin && <Picker
            selectedValue={cueUser}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) => {
              setCurUser(itemValue)
              users.map((user, index) => {
                if(index === itemIndex){
                  setUserIds(user.id)
                } 
              })
            }}
          >
          {usersList}
          </Picker>}
          {admin && <View>
            <Text style={{ fontSize: 15 }}>Woking Place: </Text>
            <Text style={{ fontSize: 20 }}>{place}</Text>
          </View>}
          <View style={styles.headContainer}>
            <Text style={styles.headDate}>Date</Text>
            <Text style={styles.headTime}>Time</Text>
            <Text style={styles.headLocation}>location</Text>
          </View>
          <View style={styles.dataContainer}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={data}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.date}>{item.date}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                  <Icon style={styles.location} name='location-outline' size={40} onPress={() => navigation.navigate('MapScreen', { longitude: item.longitude, latitude: item.latitude })} />
                </View>
              )}
            />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA'
  },
  title:{
    alignSelf: 'center',
    fontSize: 30,
    marginTop: 10,
    marginBottom: 10
  },
  headContainer:{
    flexDirection: 'row'
  },
  headDate:{
    backgroundColor: '#FF5722',
    color: 'white',
    marginBottom: 2,
    fontSize: 25,
    width: '33%',
    paddingLeft: 30,
    paddingTop: 13,
    borderRightWidth: 3,
    borderRightColor: 'white',
    height: 60
  },
  headTime:{
    backgroundColor: '#FF5722',
    color: 'white',
    marginBottom: 2,
    fontSize: 25,
    width: '33%',
    paddingLeft: 32,
    paddingTop: 13,
    borderRightWidth: 3,
    borderRightColor: 'white'
  },
  headLocation:{
    backgroundColor: '#FF5722',
    color: 'white',
    paddingLeft: 20,
    paddingTop: 13,
    marginBottom: 2,
    fontSize: 23,
    width: '33%'
  },
  dataContainer: {
    flexDirection: 'row'
  },
  date:{
    backgroundColor: '#FF8A65',
    marginBottom: 2,
    color: 'white',
    width: '33%',
    height: 45,
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 20,
    borderRightWidth: 3,
    borderRightColor: 'white'
  },
  time:{
    backgroundColor: '#FF8A65',
    marginBottom: 2,
    color: 'white',
    width: '33%',
    height: 45,
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 20,
    borderRightWidth: 3,
    borderRightColor: 'white'
  },
  location:{
    backgroundColor: '#FF8A65',
    width: '33%',
    marginBottom: 2,
    color: 'white',
    paddingLeft: 40
  }
})

export default ExploreScreen