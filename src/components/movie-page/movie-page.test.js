import React from 'react';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
import configureStore from "redux-mock-store";
import renderer from 'react-test-renderer';
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import MoviePage from "../movie-page/movie-page.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`MoviePage is rendered correctly`, () => {
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
          <MoviePage
            movie={films[0]}
            authorizationStatus={`NO_AUTH`}
            handleClickMoreButton={() => {}}
            handleClickUser={() => {}}
          />
        </Provider>
      </Router>, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
