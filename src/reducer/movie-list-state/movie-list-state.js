import {extend} from "../../utils.js";

const initialState = {
  genre: `All genres`,
  activeMovie: {},
};

const ActionType = {
  GET_SELECTED_MOVIE: `GET_SELECTED_MOVIE`,
  GET_SELECTED_GENRE: `GET_SELECTED_GENRE`,
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
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
