import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import NameSpace from "../../reducer/name-space.js";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

describe(`Render Main`, () => {

  it(`<Main /> should render movies`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        movies: films,
        promoMovie: films[0],
      },
      [NameSpace.MOVIE_LIST_STATE]: {
        activeMovie: {},
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            promoMovie={films[0]} movies={films}
          />
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
