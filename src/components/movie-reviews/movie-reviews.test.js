import React from 'react';
import renderer from 'react-test-renderer';
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import films from "../../mocks/films.js";

it(`MovieReviews is rendered correctly`, () => {
  const tree = renderer.create(
      <MovieReviews film={films[0]} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
