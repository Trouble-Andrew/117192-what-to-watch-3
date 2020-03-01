import React from 'react';
import renderer from 'react-test-renderer';
import MovieList from "../movie-list/movie-list.jsx";
import films from "../../mocks/films.js";

it(`ArtistQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(
      <MovieList films={films} handleMouseEnterCard={() => {}} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
