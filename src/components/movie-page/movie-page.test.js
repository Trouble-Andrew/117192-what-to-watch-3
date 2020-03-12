import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from "../movie-page/movie-page.jsx";
import films from "../../mocks/films.js";

it(`MoviePage is rendered correctly`, () => {
  const tree = renderer.create(
      <MoviePage movie={films[0]} />
      , {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
