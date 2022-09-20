const initialState = {
  loading: false,
  data: []
}

const Profile = (state = initialState, action = {}) => {
  switch (action.type) {
    case "USER_REQUEST":
      return { ...state, loading: true }
    case "USER_ERROR":
      return { ...state, loading: false, data: state.data, error: action.payload }
    case "USER_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null }
    default:
      return state
  }
}


export default Profile