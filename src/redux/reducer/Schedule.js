const initialState = {
  loading: false,
  data: {
    result: [],
    page: 0,
    totalPage: 0,
    totalMovie: 0,
  },
}

const Schedule = (state = initialState, action = {}) => {
  switch (action.type) {
    case "SCHEDULE_REQUEST":
      return { ...state, loading: true }
    case "SCHEDULE_ERROR":
      return { ...state, loading: false, data: null, error: action.payload }
    case "SCHEDULE_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null }
    default:
      return state
  }
}


export default Schedule