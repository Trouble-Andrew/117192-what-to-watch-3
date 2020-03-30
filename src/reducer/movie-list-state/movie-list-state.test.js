/* eslint-disable camelcase */
import {reducer, ActionType, ActionCreator, Operation} from "./movie-list-state.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import films from "../../mocks/films.js";

const api = createAPI(() => {});

const receivedMockMovie = {
  name: `Johnny English`,
  poster_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Johnny_English.jpg`,
  preview_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/johnny-english.jpg`,
  background_image: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Johnny_English.jpg`,
  background_color: `#F0DBA2`,
  description: `After a sudden attack on the MI5, Johnny English, Britain's most confident yet unintelligent spy, becomes Britain's only spy.`,
  rating: 10,
  scores_count: 136843,
  director: `Peter Howitt`,
  starring: [`Rowan Atkinson`, `John Malkovich`, `Natalie Imbruglia`],
  run_time: 88,
  genre: `Comedy`,
  released: 2003,
  id: 1,
  is_favorite: false,
  video_link: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

const expectedMockMovie = {
  title: `Johnny English`,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Johnny_English.jpg`,
  previewPoster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/johnny-english.jpg`,
  posterBig: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Johnny_English.jpg`,
  backgroundColor: `#F0DBA2`,
  preview: `After a sudden attack on the MI5, Johnny English, Britain's most confident yet unintelligent spy, becomes Britain's only spy.`,
  rating: 10,
  ratingCount: 136843,
  directors: [`Peter Howitt`],
  stars: [`Rowan Atkinson`, `John Malkovich`, `Natalie Imbruglia`],
  time: `1h 28m`,
  genres: [`Comedy`],
  date: `2003`,
  id: 1,
  isFavorite: false,
  video: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

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

it(`Action creator for increment visible movies returns action with correct element`, () => {
  expect(reducer({
    genre: `All genres`,
    activeMovie: {},
    visibleMovies: 8,
  }, {
    type: ActionType.INCREMENT_VISIBLE_MOVIES,
    payload: 8,
  })).toEqual({
    genre: `All genres`,
    activeMovie: {},
    visibleMovies: 16,
  });
});

it(`Action creator for change movie status returns action with correct element`, () => {
  expect(reducer({
    genre: `All genres`,
    activeMovie: {},
    visibleMovies: 8,
  }, {
    type: ActionType.CHANGE_MOVIE_STATUS,
    payload: films[0],
  })).toEqual({
    genre: `All genres`,
    activeMovie: films[0],
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

  it(`Action creator for increment visible movies returns correct actions`, () => {
    expect(ActionCreator.incrementVisibleMovies()).toEqual({
      type: ActionType.INCREMENT_VISIBLE_MOVIES,
      payload: 8,
    });
  });

  it(`Action creator for change movie status returns correct actions`, () => {
    expect(ActionCreator.changeMovieStatus(films[0])).toEqual({
      type: ActionType.CHANGE_MOVIE_STATUS,
      payload: films[0],
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /favorite/1/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const changeMovieStatus = Operation.changeMovieStatus(1);

    apiMock
      .onPost(`/favorite/1/1`)
      .reply(200, receivedMockMovie);

    return changeMovieStatus(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHANGE_MOVIE_STATUS,
          payload: expectedMockMovie,
        });
      });
  });
});
