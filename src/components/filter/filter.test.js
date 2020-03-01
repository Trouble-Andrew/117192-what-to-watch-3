import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Filter from "./filter.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`Filter is rendered correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    filteredList: films,
    films,
  });

  const tree = renderer.create(
      <Provider store={store}>
        <Filter films={films} genre={`All genres`} handleClickFilter={() => {}}/>
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
