import React from 'react';
import renderer from 'react-test-renderer';
import MovieDetails from "../movie-details/movie-details.jsx";
import films from "../../mocks/films.js";

it(`MovieDetails is rendered correctly`, () => {
  const tree = renderer.create(
      <MovieDetails movie={films[0]} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
