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

const user = {
  id: 1,
  email: `gg@mail.com`,
  name: `gg`,
  avatar: `https://htmlacademy-react-3.appspot.com//wtw/static/avatar/8.jpg`,
};

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
        genre: films[0].genres[0],
      },
    });

    const tree = renderer.create(
        <Router
          history={history}
        >
          <Provider store={store}>
            <Main
              promoMovie={films[0]}
              movies={films}
              visibleMovies={films}
              user={user}
              authorizationStatus={`NO_AUTH`}
              handleMoreButtonClick={() => {}}
            />
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
