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

export const getVisibleMoviesCount = (state) => {
  return state[NameSpace.MOVIE_LIST_STATE].visibleMovies;
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

export const getVisibleMovies = createSelector(
    getFiltededList,
    getVisibleMoviesCount,
    (resultOne, resultTwo) => {
      const visibleMovies = [];
      for (let i = 0; i < resultTwo; i++) {
        if (resultOne[i]) {
          visibleMovies.push(resultOne[i]);
        }
      }
      return visibleMovies;
    }
);
