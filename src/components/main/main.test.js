import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import NameSpace from "../../reducer/name-space.js";
import films from "../../mocks/films.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

describe(`Render Main`, () => {

  it(`<Main /> should render movies`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies: films,
        promoMovie: films[0],
        visibleMovies: 8,
      },
      [NameSpace.MOVIE_LIST_STATE]: {
        activeMovie: {},
      },
    });

    const tree = renderer.create(
        <Router
          history={history}
        >
          <Provider store={store}>
            <Main
              promoMovie={films[0]} movies={films} visibleMovies={films}
            />
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
