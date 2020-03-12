/* eslint-disable camelcase */
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {films as movies} from "../../mocks/films.js";

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
  director: [`Peter Howitt`],
  stars: [`Rowan Atkinson`, `John Malkovich`, `Natalie Imbruglia`],
  time: `1h 28m`,
  genre: [`Comedy`],
  date: `2003`,
  id: 1,
  isFavorite: false,
  video: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
  previewVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

const receivedMockComment = {
  id: 1,
  user: {id: 16, name: `Mollie`},
  rating: 6.8,
  comment: `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
  date: `2020-02-21T13:52:49.577Z`,
};

const expectedMockComment = {
  id: 16,
  author: `Mollie`,
  rating: 6.8,
  text: `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
  date: `2020-02-21T13:52:49.577Z`,
};

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies: [],
    promoMovie: {},
    comments: [],
  });
});

it(`Reducer should update movies by load movies`, () => {
  expect(reducer({
    movies: [],
  }, {
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  })).toEqual({
    movies,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieLoader = Operation.loadMovies();

    apiMock
      .onGet(`/films`)
      .reply(200, [receivedMockMovie]);

    return movieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [expectedMockMovie],
        });
      });
  });

  it(`Should make a correct API call to /comments`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentLoader = Operation.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [receivedMockComment]);

    return commentLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: [expectedMockComment],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const activeMovieLoader = Operation.loadActiveMovie();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, receivedMockMovie);

    return activeMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_ACTIVE_MOVIE,
          payload: expectedMockMovie,
        });
      });
  });
});
