import React, { useEffect, useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet, Button, Image, TextInput, ActivityIndicator, Pressable, ToastAndroid, Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthLogin } from '../../redux/actions/Auth.js';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';


function Register(props) {
  const [formRegister, setFormRegister] = useState({ first_name: '', last_name: '', phone_number: '', email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`https://deploy-tickitz-be.herokuapp.com/api/v1/auth/register`, formRegister)
      .then((res) => {
        props.navigation.navigate('AuthScreen', {
          screen: 'Login',
        });
      }).catch((err) => {
        Alert.alert(err.response.data.msg)
      })
  }
  const handleChangeText = (text, name) => {
    setFormRegister({ ...formRegister, [name]: text })
  }
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    props.navigation.navigate('AuthScreen', {
      screen: 'Login',
    });
  };
  console.log(formRegister, '567')
  return (
    <>
      <ScrollView style={styles.container}>
        <Image
          source={require('../../assets/image/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.signIn}>Login</Text>
        <Text style={styles.form}>First Name</Text>
        <TextInput style={styles.email} placeholder="Type your first name..." autoCapitalize="none" keyboardType="default" onChangeText={text => handleChangeText(text, 'first_name')}
        />
        <Text style={styles.form}>Last Name</Text>
        <TextInput style={styles.email} placeholder="Type your email..." autoCapitalize="none" keyboardType='default' onChangeText={text => handleChangeText(text, 'last_name')}
        />
        <Text style={styles.form}>Phone Number</Text>
        <TextInput style={styles.email} placeholder="Type your phone number..." autoCapitalize="none" keyboardType='number-pad' onChangeText={text => handleChangeText(text, 'phone_number')}
        />
        <Text style={styles.form}>Email</Text>
        <TextInput style={styles.email} placeholder="Type your email..." autoCapitalize="none" keyboardType="email-address" onChangeText={text => handleChangeText(text, 'email')}
        />
        <Text style={styles.form}>Password</Text>
        <View style={styles.wrapperPass}>
          <TextInput
            style={styles.password}
            placeholder="Type your password..."
            autoCapitalize="none"
            secureTextEntry={showPassword ? false : true} onChangeText={text => handleChangeText(text, 'password')}
          />
          <Text
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPass}>
            {showPassword ? (
              <Feather name="eye-off" style={{ fontSize: 20 }} />
            ) : (
              <Feather name="eye" style={{ fontSize: 20 }} />
            )}
          </Text>
        </View>
        <Pressable style={{
          borderRadius: 4,
          backgroundColor: '#5F2EEA',
          padding: '3%',
        }}
          onPress={handleSubmit}
        >
          <Text style={{
            color: 'white', fontFamily: 'Mulish-Regular',
            fontSize: 18, textAlign: 'center'
          }}>Register</Text>
        </Pressable>

        <ScrollView style={styles.wrapperBottom}>
          <View style={styles.wrapperLink}>
            <Text style={styles.wrapperText}>Already have account? </Text>
            <Text onPress={handleLogin} style={styles.linkWrapper}>
              Login
            </Text>
          </View>
        </ScrollView>
      </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingVertical: '10%',
    backgroundColor: 'white',
  },
  logo: {
    marginBottom: 20,
    width: 90,
    height: 30,
  },
  signIn: {
    marginBottom: 20,
    fontSize: 30,
    fontFamily: 'Mulish-ExtraBold',
    letterSpacing: 1,
  },
  form: {
    fontSize: 20,
    fontFamily: 'Mulish-Regular',
    marginTop: 15,
  },

  email: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FCFDFE',
    borderRadius: 4,
    fontFamily: 'Mulish-Regular',
  },
  wrapperPass: {
    flexDirection: 'row',
  },
  password: {
    flex: 6,
    marginVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    padding: 10,
    backgroundColor: '#FCFDFE',
    fontFamily: 'Mulish-Regular',
    marginBottom: 40,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  showPass: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    padding: 10,
    fontFamily: 'Mulish-Regular',
    marginBottom: 40,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  buttonLogin: {
    fontFamily: 'Mulish-Regular',
    fontSize: 80,
  },
  wrapperBottom: {
    marginVertical: 40,
  },

  wrapperLink: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  wrapperText: {
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
  },
  linkWrapper: {
    textDecorationLine: 'underline',
    color: 'blue',
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
  },
});
export default Register;
