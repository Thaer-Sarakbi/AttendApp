import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton'
import { AuthContext } from '../context/AuthContext';
// import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native-gesture-handler';
import { Formik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password')
})

const LoginScreens = ({ navigation }) => {
  // const [email, setEmail] = useState()
  // const [password, setPassword] = useState()
 
  const { login, error } = useContext(AuthContext)
   //console.log(error)
  let err = error.toString()

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image 
          source={require('../../assets/00.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>ARK Deglory</Text>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(credintials) => {
            login(credintials.email, credintials.password)
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
            <>
              <FormInput 
                //labelValue={email}
                //onChangeText={(userEmail) => setEmail(userEmail)}
                onChangeText={handleChange('email')}  //initialValues
                placeHolderText='Email'
                iconType='user'
                onBlur={() => setFieldTouched('email')}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
              />
              {error.exist && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{error.text}</Text>}
              {touched.email && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{errors.email}</Text>}
              <FormInput 
                //labelValue={password}
                //onChangeText={(userPassword) => setPassword(userPassword)}
                onChangeText={handleChange('password')}
                placeHolderText='Password'
                iconType='lock'
                onBlur={() => setFieldTouched('password')}
                secureTextEntry={true}
              />
              {touched.password && <Text style={{ color: 'red', alignSelf: 'flex-start' }}>{errors.password}</Text>}
              <FormButton 
                buttonTitle='Sign In' 
                //onPress={() => login(email, password)} 
                onPress={handleSubmit}
              />
              <TouchableOpacity style={styles.forgotButton} >
                <Text style={styles.navButtonText}>Forgot Password?</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        
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
        <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.navButtonText}>Don't have an account? Create here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      },
      logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
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
      forgotButton: {
        marginVertical: 35,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Lato-Regular',
      },
})

export default LoginScreens