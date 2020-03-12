import {extend} from "../../utils.js";
import Adapter from "../../adapter.js";
import CommentsAdapter from "../../comments-adapter.js";

const initialState = {
  movies: [],
  promoMovie: {},
  comments: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_ACTIVE_MOVIE: `LOAD_ACTIVE_MOVIE`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
};

const ActionCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },
  loadActiveMovie: (movie) => {
    return {
      type: ActionType.LOAD_ACTIVE_MOVIE,
      payload: movie,
    };
  },
  loadComments: (comments) => {
    return {
      type: ActionType.LOAD_COMMENTS,
      payload: comments,
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(Adapter.parseElements(response.data)));
      });
  },
  loadActiveMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadActiveMovie(Adapter.parseElement(response.data)));
      });
  },
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(CommentsAdapter.parseElements(response.data)));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
    case ActionType.LOAD_ACTIVE_MOVIE:
      return extend(state, {
        promoMovie: action.payload,
      });
    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload,
      });
  }
  return state;
};


export {reducer, Operation, ActionType, ActionCreator};
