import {extend} from "./utils.js";
import films from "./mocks/films.js";

const initialState = {
  genre: `All genres`,
  filteredList: [...films],
  films,
};

const ActionType = {
  SELECT_FILTER: `SELECT_FILTER`,
  GET_FILTERED_LIST: `GET_FILTERED_LIST`,
};

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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.GET_FILTERED_LIST:

      return extend(state, {
        filteredList: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
