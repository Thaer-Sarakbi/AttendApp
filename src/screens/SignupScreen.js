import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton'
import { AuthContext } from '../context/AuthContext'
import { Formik } from 'formik'
import * as Yup from 'yup'
// import { Picker } from '@react-native-picker/picker';
 
const SignupScreen = ({ navigation }) => {
  // const [name, setName] = useState('')  
  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()
  // const [confirmPassword, setConfirmPassword] = useState()
  //const [location, setLocation] = useState('') 
 
  const { register, regError } = useContext(AuthContext)
  console.log(regError)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label('Name'),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password must match').required(),
    location: Yup.string().required().label('location')
  })
    
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <Formik
          initialValues={{ name: '', email: '', password: '', location: '' }}
          onSubmit={(credintials) => {
            console.log(credintials)
            register(credintials.name, credintials.email, credintials.password, credintials.location)
          }}
          validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
            <>
              <FormInput 
                //labelValue={name}
                //onChangeText={(userName) => setName(userName)}
                onChangeText={handleChange('name')}
                onBlur={() => setFieldTouched('name')}
                placeHolderText='Full Name'
                iconType='user'
                autoCapitalize='none'
                autoCorrect={false}
              /> 
              {touched.name && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{errors.name}</Text>}
              <FormInput 
                //labelValue={email}
                //onChangeText={(userEmail) => setEmail(userEmail)}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                placeHolderText='Email'
                iconType='user'
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
              />
              {regError.exist && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{regError.text}</Text>}
              {touched.email && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{errors.email}</Text>}
              <FormInput 
                //labelValue={password}
                //onChangeText={(userPassword) => setPassword(userPassword)}
                onChangeText={handleChange('password')}
                placeHolderText='Password'
                iconType='lock'
                secureTextEntry={true}
              />
              {touched.password && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{errors.password}</Text>}
              <FormInput 
                //labelValue={confirmPassword}
                //onChangeText={(userPassword) => setConfirmPassword(userPassword)} 
                onChangeText={handleChange('confirmPassword')}
                placeHolderText='Confirm Password'
                iconType='lock'
                secureTextEntry={true}
              />
              {touched.name && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{errors.confirmPassword}</Text>}
              <FormInput 
                onChangeText={handleChange('location')}
                placeHolderText='Working Place'
                iconType='user'
                secureTextEntry={false}
              />
              {touched.location && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{errors.location}</Text>}
              <FormButton buttonTitle='Sign Up' onPress={handleSubmit} />
            </>
         )}
      </Formik>
      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our</Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>Terms of service</Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>Privacy Policy</Text>
      </View>
      <SocialButton 
        buttonTitle='Sign In with Facebook'
        btnType='facebook'
        color='#4867aa'
        backgroundColor='#e6eaf4'
        onPress={() => {}}
      />
      <SocialButton 
        buttonTitle='Sign In with Google'
        btnType='google'
        color='#de4d41'
        backgroundColor='#f5e7ea'
        onPress={() => {}}
      />
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('SignInScreen')}>
        <Text style={styles.navButtonText}>Have account? Sign up</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
})

export default SignupScreen