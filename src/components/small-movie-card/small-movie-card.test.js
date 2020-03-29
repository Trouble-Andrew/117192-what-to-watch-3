import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import history from "../../history.js";
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
      <Router
        history={history}
      >
        <Provider store={store}>
          <SmallMovieCard
            movie={films[0]}
            handleCardClick={() => {}}
            startPlay={() => {}}
            stopPlay={() => {}}
            isPlay={false}
          />
        </Provider>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
