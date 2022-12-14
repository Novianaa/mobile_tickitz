import React, { useEffect, useState } from 'react';
import {
  ScrollView, View, Text, StyleSheet, Button, Image, TextInput, ActivityIndicator, Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthLogin } from '../../redux/actions/Auth.js';
import { useDispatch, useSelector } from 'react-redux';


function Login(props) {
  const [form, setForm] = useState({ email: '', password: '' });
  const { error, loading, isLogin } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(AuthLogin(form))
  }
  useEffect(() => {
    if (isLogin === true) {
      props.navigation.navigate('AppScreen', {
        screen: 'DetailMovie',
      });
    } else {
      props.navigation.navigate('AuthScreen', {
        screen: 'Login',
      });
    }
  }, [isLogin])

  const handleInput = (text, name) => {
    setForm({ ...form, [name]: text });
  };
  const handleForgot = () => {
    props.navigation.navigate('AuthScreen', {
      screen: 'Register',
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../../assets/image/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.signIn}>Login</Text>
        <Text style={styles.form}>Email</Text>
        <TextInput
          style={styles.email}
          placeholder="Type your email..."
          autoCapitalize="none"
          keyboardType="email-address" onChangeText={text => handleInput(text, 'email')}
        />
        <Text style={styles.form}>Password</Text>
        <View style={styles.wrapperPass}>
          <TextInput
            style={styles.password}
            placeholder="Type your password..."
            autoCapitalize="none"
            secureTextEntry={showPassword ? false : true} onChangeText={text => handleInput(text, 'password')}
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
        <Pressable
          style={{
            borderRadius: 4,
            backgroundColor: '#5F2EEA',
            padding: '3%',
          }}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={{
              color: 'white', fontFamily: 'Mulish-Regular',
              fontSize: 18, textAlign: 'center'
            }}>Login</Text>
          )}
        </Pressable>

        <ScrollView style={styles.wrapperBottom}>
          <View style={styles.wrapperLink}>
            <Text style={styles.wrapperText}>Forgot your password?</Text>
            <Text onPress={handleForgot} style={styles.linkWrapper}>
              Reset now
            </Text>
          </View>
          <View style={styles.wrapperLink}>
            <Text style={styles.wrapperText}>Don't have an account? </Text>
            <Text onPress={handleForgot} style={styles.linkWrapper}>
              Sign Up
            </Text>
          </View>
        </ScrollView>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    marginTop: 40,
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
export default Login;
