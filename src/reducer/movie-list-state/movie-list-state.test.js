import {reducer, ActionType, ActionCreator} from "./movie-list-state.js";
import films from "../../mocks/films.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
    activeMovie: {},
    visibleMovies: 8,
  });
});

it(`Action creator for select movies returns action with correct element`, () => {
  expect(reducer({
    genre: `All genres`,
    activeMovie: {},
    visibleMovies: 8,
  }, {
    type: ActionType.GET_SELECTED_MOVIE,
    payload: films[0],
  })).toEqual({
    genre: `All genres`,
    activeMovie: films[0],
    visibleMovies: 8,
  });
});

it(`Action creator for select genre returns action with correct element`, () => {
  expect(reducer({
    genre: `All genres`,
    activeMovie: {},
    visibleMovies: 8,
  }, {
    type: ActionType.GET_SELECTED_GENRE,
    payload: `Drama`,
  })).toEqual({
    genre: `Drama`,
    activeMovie: {},
    visibleMovies: 8,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for select movie returns correct actions`, () => {
    expect(ActionCreator.getSelectedMovie(films[0])).toEqual({
      type: ActionType.GET_SELECTED_MOVIE,
      payload: films[0],
    });
  });

  it(`Action creator for select genre returns correct actions`, () => {
    expect(ActionCreator.getSelectedGenre(`Drama`)).toEqual({
      type: ActionType.GET_SELECTED_GENRE,
      payload: `Drama`,
    });
  });
});
