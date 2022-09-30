import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BookingSeatRequest = () => {
  return {
    type: "BOOKING_SEAT_REQUEST",
  };
};

const BookingSeatSuccess = (data) => {
  return {
    type: "BOOKING_SEAT_SUCCESS",
    payload: data
  };
};

const BookingSeatError = (error) => {
  return {
    type: "BOOKING_SEAT_ERROR",
    payload: error
  };
};

export const BookingSeat = (movie_id, schedule_id, date, time) => async (dispatch) => {
  let token = await AsyncStorage.getItem('token')
  dispatch(BookingSeatRequest())
  axios({
    method: 'GET',
    url: `https://backend-tickitz.vercel.app/api/v1/seat-booking?movie_id=${movie_id}&schedule_id=${schedule_id}&date=${date}&time=${time}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      console.log(`https://backend-tickitz.vercel.app/api/v1/seat-booking?movie_id=${movie_id}&schedule_id=${schedule_id}&date=${date}&time=${time}`, 'firt')
      dispatch(BookingSeatSuccess(res.data.data))
    }).catch((err) => {
      dispatch(BookingSeatError(err.response.data.msg))
    })
}