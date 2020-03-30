import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Filter from "./filter.jsx";
import NameSpace from "../../reducer/name-space.js";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`Filter is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies: films,
      promoMovie: films[0],
    },
    [NameSpace.MOVIE_LIST_STATE]: {
      activeMovie: {},
      genre: films[0].genres[0],
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Filter
          movies={films}
          tab={0}
          toggleTab={() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
