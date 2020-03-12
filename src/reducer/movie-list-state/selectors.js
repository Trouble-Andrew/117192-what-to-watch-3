import {createSelector} from "reselect";
import NameSpace from "../name-space.js";


export const getMovies = (state) => {
  return state[NameSpace.DATA].movies;
};

export const getActiveMovie = (state) => {
  return state[NameSpace.MOVIE_LIST_STATE].activeMovie;
};

export const getGenre = (state) => {
  return state[NameSpace.MOVIE_LIST_STATE].genre;
};

export const getFiltededList = createSelector(
    getMovies,
    getGenre,
    (resultOne, resultTwo) => {
      if (resultTwo === `All genres`) {
        return resultOne;
      }
      let newArray = resultOne.filter(function (el) {
        return el.genre.includes(resultTwo);
      });
      return newArray;
    }
);
