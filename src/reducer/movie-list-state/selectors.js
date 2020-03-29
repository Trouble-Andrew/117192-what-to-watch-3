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
      let newArray = resultOne.filter(function (movie) {
        return movie.genres.includes(resultTwo);
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

export const getSilimarMovies = createSelector(
    getMovies,
    getActiveMovie,
    (resultOne, resultTwo) => {
      let newArray = resultOne.filter(function (movie) {
        return movie.genres[0].includes(resultTwo.genres[0]);
      });
      return newArray;
    }
);
