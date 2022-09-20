import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MovieRequest = () => {
  return {
    type: "MOVIE_REQUEST",
  };
};

const MovieSuccess = (data) => {
  return {
    type: "MOVIE_SUCCESS",
    payload: data
  };
};

const MovieError = (error) => {
  return {
    type: "MOVIE_ERROR",
    payload: error
  };
};

// export const GetDetailMovie = async (movie_id) => {
//   let token = await AsyncStorage.getItem('token')
//   return async (dispatch) => {
//     dispatch(MovieRequest())
//     await axios({
//       method: "GET",
//       url: `https://deploy-tickitz-be.herokuapp.com/api/v1/movies/${movie_id}`,
//       headers: {
//         authorization: `Bearer ${token}`
//       },
//     })
//       .then((res) => {
//        console.log(`https://deploy-tickitz-be.herokuapp.com/api/v1/movies/${movie_id}`, 'rtrt')
//         dispatch(MovieSuccess(res.data.data))
//       }).catch((err) => {
//         console.log(err)
//         dispatch(MovieError(err.response.data))
//       })
//   }
// }
export const GetDetailMovie = (movie_id) => async (dispatch) => {
  //console.log(movie_id, 'tyty')
  let token = await AsyncStorage.getItem('token')
  //console.log(token, 'fgfg')
  dispatch(MovieRequest())
  axios({
    method: 'GET',
    url: `https://deploy-tickitz-be.herokuapp.com/api/v1/movies/${movie_id}`,
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      dispatch(MovieSuccess(res.data.data))
    }).catch((err) => {
      dispatch(MovieError(err.response.data.msg))
    })
}


