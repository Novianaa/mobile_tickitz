import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BookingRequest = () => {
  return {
    type: "BOOKING_REQUEST",
  };
};

const BookingSuccess = (data) => {
  return {
    type: "BOOKING_SUCCESS",
    payload: data
  };
};

const BookingError = (error) => {
  return {
    type: "BOOKING_ERROR",
    payload: error
  };
};

export const BookingSeat = (formData) => async (dispatch) => {
  let token = await AsyncStorage.getItem('token')
  dispatch(BookingRequest())
  axios({
    method: 'POST',
    url: `https://deploy-tickitz-be.herokuapp.com/api/v1/booking/`,
    data: formData,
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      dispatch(BookingSuccess(res.data.data))
    }).catch((err) => {
      dispatch(BookingError(err.response.data.msg))
    })
}