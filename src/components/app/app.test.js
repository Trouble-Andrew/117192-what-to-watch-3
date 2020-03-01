import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  date: 2014,
  genre: `Drama`
};

it(`Render App`, () => {
  const store = mockStore({
    genre: `All genres`,
    filteredList: films,
    films,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            movieData={PromoMovie} films={films}
          />
        </Provider>)
      .toJSON();

  expect(tree).toMatchSnapshot();
});
