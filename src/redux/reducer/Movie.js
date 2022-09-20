const initialState = {
  loading: false,
  data: []
}

const Movie = (state = initialState, action = {}) => {
  switch (action.type) {
    case "MOVIE_REQUEST":
      return { ...state, loading: true }
    case "MOVIE_ERROR":
      return { ...state, loading: false, data: state.data, error: action.payload }
    case "MOVIE_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null }
    default:
      return state
  }
}


export default Movie