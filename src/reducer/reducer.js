import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as movieListState} from "./movie-list-state/movie-list-state.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.MOVIE_LIST_STATE]: movieListState,
  [NameSpace.USER]: user,
});
