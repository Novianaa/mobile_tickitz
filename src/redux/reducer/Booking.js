const initialState = {
  loading: false,
  data: []
}

const Booking = (state = initialState, action = {}) => {
  switch (action.type) {
    case "Booking_REQUEST":
      return { ...state, loading: true }
    case "Booking_ERROR":
      return { ...state, loading: false, data: state.data, error: action.payload }
    case "Booking_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null }
    default:
      return state
  }
}


export default Booking