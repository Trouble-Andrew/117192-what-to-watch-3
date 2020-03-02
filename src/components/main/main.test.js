import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  date: 2014,
  genre: `Drama`
};

describe(`Render Main`, () => {

  it(`<Main /> should render movies`, () => {
    const store = mockStore({
      genre: `All genres`,
      filteredList: films,
      films,
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            movieData={PromoMovie} films={films} handleMouseEnterCard={() => {}}
          />
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`<Main /> should render empthy list`, () => {
    const store = mockStore({
      genre: `All genres`,
      filteredList: films,
      films,
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            movieData={PromoMovie} films={[]} handleMouseEnterCard={() => {}}
          />
        </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
