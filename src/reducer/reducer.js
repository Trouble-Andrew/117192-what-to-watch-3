import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as movieListUtils} from "./movie-list-utils/movie-list-utils.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";


export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.MOVIE_LIST_UTILS]: movieListUtils,
  [NameSpace.USER]: user,
});
