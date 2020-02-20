import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from "../movie-page/movie-page.jsx";

const film = {
  title: `Joker`,
  date: `3.10.2019`,
  genre: [`Crime`, `Drama`, `Thriller`],
  poster: `https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
  posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 8.6,
  ratingCount: 56900,
  director: [`Bong Joon Ho`],
  stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
  preview: `In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.`
};

it(`MoviePage is rendered correctly`, () => {
  const tree = renderer.create(
      <MoviePage film={film} handleMouseEnterCard={() => {}} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
