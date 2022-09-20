import { combineReducers } from "redux";
import Auth from './Auth'
import Schedule from "./Schedule";
import Movie from './Movie'
import Profile from "./User";

const rootReducer = combineReducers({
  auth: Auth,
  schedule: Schedule,
  movie: Movie,
  user: Profile,
})
export default rootReducer