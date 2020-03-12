import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import MovieList from "../movie-list/movie-list.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`MovieList is rendered correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    activeMovie: {},
  });

  const tree = renderer.create(
      <Provider store={store}>
        <MovieList movies={films} />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
