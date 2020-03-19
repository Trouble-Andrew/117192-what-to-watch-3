import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
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
      <Router
        history={history}
      >
        <Provider store={store}>
          <MovieList movies={films} />
        </Provider>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
