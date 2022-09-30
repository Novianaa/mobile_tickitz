const initialState = {
  loading: false,
  data: []
}

const BookingSeat = (state = initialState, action = {}) => {
  switch (action.type) {
    case "BOOKING_SEAT_REQUEST":
      return { ...state, loading: true }
    case "BOOKING_SEAT_ERROR":
      return { ...state, loading: false, data: state.data, error: action.payload }
    case "BOOKING_SEAT_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null }
    default:
      return state
  }
}


export default BookingSeat