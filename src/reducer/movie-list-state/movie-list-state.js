import {extend} from "../../utils.js";
import Adapter from "../../adapters/adapter.js";

const initialState = {
  genre: `All genres`,
  activeMovie: {},
  visibleMovies: 8,
};

const ActionType = {
  GET_SELECTED_MOVIE: `GET_SELECTED_MOVIE`,
  GET_SELECTED_GENRE: `GET_SELECTED_GENRE`,
  INCREMENT_VISIBLE_MOVIES: `INCREMENT_VISIBLE_MOVIES`,
  CHANGE_MOVIE_STATUS: `CHANGE_MOVIE_STATUS`,
};

const ActionCreator = {
  getSelectedMovie: (movie) => {
    return {
      type: ActionType.GET_SELECTED_MOVIE,
      payload: movie,
    };
  },
  getSelectedGenre: (genre) => {
    return {
      type: ActionType.GET_SELECTED_GENRE,
      payload: genre,
    };
  },
  incrementVisibleMovies: () => {
    return {
      type: ActionType.INCREMENT_VISIBLE_MOVIES,
      payload: 8,
    };
  },
  changeMovieStatus: (movie) => {
    return {
      type: ActionType.CHANGE_MOVIE_STATUS,
      payload: movie,
    };
  },
};

const Operation = {
  changeMovieStatus: (id, favorite) => (dispatch, getState, api) => {
    return api.post(`/favorite/${id}/${favorite ? 0 : 1}`)
      .then((response) => {
        dispatch(ActionCreator.changeMovieStatus(Adapter.parseElement(response.data)));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_SELECTED_MOVIE:

      return extend(state, {
        activeMovie: action.payload,
      });

    case ActionType.GET_SELECTED_GENRE:

      return extend(state, {
        genre: action.payload,
      });

    case ActionType.INCREMENT_VISIBLE_MOVIES:

      return extend(state, {
        visibleMovies: state.visibleMovies + action.payload,
      });

    case ActionType.CHANGE_MOVIE_STATUS:

      return extend(state, {
        activeMovie: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
