import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";
import films from "../../mocks/films.js";

const mockStore = configureStore([]);

it(`SmallMovieCard is rendered correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    activeMovie: {},
  });

  const tree = renderer.create(
      <Provider store={store}>
        <SmallMovieCard movie={films[0]} handleClickCard={() => {}} startPlay={() => {}} stopPlay={() => {}} isPlay={false} />
      </Provider>
      , {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
