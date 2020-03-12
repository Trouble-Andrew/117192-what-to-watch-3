import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import films from "../../mocks/films.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

it(`MovieReviews is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies: films,
      promoMovie: films[0],
      comments: films[0].reviews,
    },
    [NameSpace.MOVIE_LIST_STATE]: {
      activeMovie: {},
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <MovieReviews />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
