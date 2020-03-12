import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getPromoMovie = (state) => {
  return state[NameSpace.DATA].promoMovie;
};

export const getComments = (state) => {
  return state[NameSpace.DATA].comments;
};
