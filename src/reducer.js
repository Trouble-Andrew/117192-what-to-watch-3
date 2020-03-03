import {extend} from "./utils.js";
import films from "./mocks/films.js";
import ActionType from "./action-types.js";
import initialState from "./initial-state.js";

const getFiltededList = (type) => {
  if (type === `All genres`) {
    return films;
  }
  let newArray = films.filter(function (el) {
    return el.genre.includes(type);
  });
  return newArray;
};

const ActionCreator = {
  getFiltededList: (type) => {
    return {
      type: ActionType.GET_FILTERED_LIST,
      payload: getFiltededList(type),
    };
  },
  getSelectedMovie: (movie) => {
    return {
      type: ActionType.GET_SELECTED_MOVIE,
      payload: movie,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_FILTERED_LIST:

      return extend(state, {
        filteredList: action.payload,
      });

    case ActionType.GET_SELECTED_MOVIE:

      return extend(state, {
        activeMovie: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
