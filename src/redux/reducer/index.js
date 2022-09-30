import { combineReducers } from "redux"
import Auth from './Auth'
import Schedule from "./Schedule"
import Movie from './Movie'
import Profile from "./User"
import BookingSeat from './BookingSeat'

const rootReducer = combineReducers({
  auth: Auth,
  schedule: Schedule,
  movie: Movie,
  user: Profile,
  seat: BookingSeat
})
export default rootReducer