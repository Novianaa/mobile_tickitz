import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const LoginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

const LoginSuccess = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data
  };
};

const LoginError = (error) => {
  return {
    type: "LOGIN_ERROR",
    payload: error
  };
};
export const AuthLogin = (formData) => {
  return async (dispatch) => {

    dispatch(LoginRequest())
    await axios({
      method: "POST",
      url: `https://deploy-tickitz-be.herokuapp.com/api/v1/auth/login`,
      data: {
        email: formData.email,
        password: formData.password,
      }
    })
      .then((res) => {
        AsyncStorage.setItem('token', res.data.data.token)
        dispatch(LoginSuccess(res.data.data))
      }).catch((err) => {
        dispatch(LoginError(err.response.data))
        Alert.alert(err.response.data.msg)
      })
  }
};

export const AuthLogout = () => {
  return {
    type: "AUTH_LOGOUT",
  };
};