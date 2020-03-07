import React from 'react';
import renderer from 'react-test-renderer';
import MovieOverview from "../movie-reviews/movie-reviews.jsx";
import films from "../../mocks/films.js";

it(`MovieOverview is rendered correctly`, () => {
  const tree = renderer.create(
      <MovieOverview film={films[0]} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
