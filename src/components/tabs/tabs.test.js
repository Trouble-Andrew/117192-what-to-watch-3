import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import Tabs from "../tabs/tabs.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`Tabs is rendered correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movies: films,
      promoMovie: films[0],
    },
    [NameSpace.MOVIE_LIST_STATE]: {
      activeMovie: films[0],
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Tabs
          movie={films[0]}
          tab={0}
          toggleTab={() => {}}
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
