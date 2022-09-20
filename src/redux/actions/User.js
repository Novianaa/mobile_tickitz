import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const UserRequest = () => {
  return {
    type: "USER_REQUEST",
  };
};

const UserSuccess = (data) => {
  return {
    type: "USER_SUCCESS",
    payload: data
  };
};

const UserError = (error) => {
  return {
    type: "USER_ERROR",
    payload: error
  };
};

export const GetProfile = (formData) => async (dispatch) => {
  let token = await AsyncStorage.getItem('token')
  dispatch(UserRequest())
  axios({
    method: 'GET',
    url: `https://deploy-tickitz-be.herokuapp.com/api/v1/users/profile`,
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      console.log(res, 'res')
      dispatch(UserSuccess(res.data.data))
    }).catch((err) => {
      console.log(err, 'err')
      dispatch(UserError(err.response.data.msg))
    })
}