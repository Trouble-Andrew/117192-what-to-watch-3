import {extend} from "../../utils.js";
import Adapter from "../../adapters/adapter.js";
import CommentsAdapter from "../../adapters/comments-adapter.js";

const initialState = {
  dataFetching: true,
  movies: [],
  promoMovie: {},
  comments: [],
  favoriteMovies: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_ACTIVE_MOVIE: `LOAD_ACTIVE_MOVIE`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  CHANGE_PROMO_STATUS: `CHANGE_PROMO_STATUS`,
  SUBMIT_REVIEW: `SUBMIT_REVIEW`,
  DATA_FETCHING_SUCCESS: `DATA_FETCHING_SUCCESS`,
  DATA_FETCHING_START: `DATA_FETCHING_START`,
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
  loadFavoriteMovies: (movies) => {
    return {
      type: ActionType.LOAD_FAVORITE_MOVIES,
      payload: movies,
    };
  },
  changeMovieStatus: (movie) => {
    return {
      type: ActionType.CHANGE_PROMO_STATUS,
      payload: movie,
    };
  },
  submitReview: (review) => {
    return {
      type: ActionType.SUBMIT_REVIEW,
      payload: review,
    };
  },
  dataFetchingSuccess: () => {
    return {
      type: ActionType.DATA_FETCHING_SUCCESS,
      payload: false,
    };
  },
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadMovies(Adapter.parseElements(response.data)));
        dispatch(ActionCreator.dataFetchingSuccess());
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
  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteMovies(Adapter.parseElements(response.data)));
        dispatch(ActionCreator.dataFetchingSuccess());
      });
  },
  changeMovieStatus: (id, favorite) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${favorite ? 0 : 1}`)
      .then((response) => {
        dispatch(ActionCreator.changeMovieStatus(Adapter.parseElement(response.data)));
      });
  },
  submitReview: (id, review, func, funcSuccess, funcFail) => (dispatch, getState, api) => {
    return api.post(`/comments/${id}`, review)
      .then((response) => {
        dispatch(ActionCreator.loadComments(CommentsAdapter.parseElements(response.data)));
        func();
        if (response.status === 200) {
          funcSuccess();
        }
        if (response.status === 400) {
          funcFail();
        }
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
    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload,
      });
    case ActionType.CHANGE_PROMO_STATUS:
      return extend(state, {
        promoMovie: action.payload,
      });
    case ActionType.SUBMIT_REVIEW:
      return extend(state, {
        promoMovie: action.payload,
      });
    case ActionType.DATA_FETCHING_SUCCESS:
      return extend(state, {
        dataFetching: action.payload,
      });
  }
  return state;
};


export {reducer, Operation, ActionType, ActionCreator};
