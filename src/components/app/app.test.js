import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import NameSpace from "../../reducer/name-space.js";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`Render App`, () => {
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
          <App filteredList={films} />
        </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
