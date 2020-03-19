import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import MoreMovies from "../more-movies/more-movies.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`MoreMovies is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies: films,
      promoMovie: films[0],
    },
    [NameSpace.MOVIE_LIST_STATE]: {
      activeMovie: films[0],
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    },
  });

  const tree = renderer.create(
      <Router
        history={history}
      >
        <Provider store={store}>
          <MoreMovies movies={films} />
        </Provider>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
