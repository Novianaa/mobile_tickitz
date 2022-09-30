import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ScheduleRequest = () => {
  return {
    type: 'SCHEDULE_REQUEST',
  };
};

const ScheduleSuccess = data => {
  return {
    type: 'SCHEDULE_SUCCESS',
    payload: data,
  };
};

const ScheduleError = error => {
  return {
    type: 'SCHEDULE_ERROR',
    payload: error,
  };
};

export const ScheduleNow = () => {
  return dispatch => {
    dispatch(ScheduleRequest());
    axios({
      method: 'GET',
      url: 'https://backend-tickitz.vercel.app/api/v1/schedule/now?limit=5',
    })
      .then(res => {
        //console.log(res, '9090')
        dispatch(ScheduleSuccess(res.data.data));
      })
      .catch(err => {
        //console.log(err)
        dispatch(ScheduleError(err.response.data));
      });
  };
};
export const ScheduleUpcoming = () => {
  return dispatch => {
    dispatch(ScheduleRequest());
    axios({
      method: 'GET',
      url: 'https://backend-tickitz.vercel.app/api/v1/schedule/upcoming?limit=5',
    })
      .then(res => {
        dispatch(ScheduleSuccess(res.data.data));
      })
      .catch(err => {
        //console.log(err)
        dispatch(ScheduleError(err.response.data));
      });
  };
};
export const GetScheduleByMovieId = (movie_id, location, date) => async dispatch => {
  let token = await AsyncStorage.getItem('token');
  dispatch(ScheduleRequest());
  axios({
    method: 'GET',
    url: `https://backend-tickitz.vercel.app/api/v1/schedule/movie/${movie_id}?location=${location}&date=${date}&limit=4`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      // console.log(`https://backend-tickitz.vercel.app/api/v1/schedule/movie/${movie_id}?location=${location}&date=${date}&limit=4`);
      dispatch(ScheduleSuccess(res.data.data));
    })
    .catch(err => {
      dispatch(ScheduleError(err.response.data));
    });
};
