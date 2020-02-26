import React from 'react';
import renderer from 'react-test-renderer';
import MovieReviews from "../movie-reviews/movie-reviews.jsx";

const film = {
  title: `Parasite`,
  date: `04.07.2019`,
  genre: [`Crime`, `Drama`, `Comedy`],
  poster: `https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
  posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
  video: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  rating: 8.6,
  time: `2h 12min`,
  ratingCount: 227900,
  director: [`Bong Joon Ho`],
  stars: [`Kang-ho Song`, `Sun-kyun Lee`, `Yeo-jeong Jo`],
  preview: `A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.`,
  reviews: [
    {
      author: `Jeremy_Urquhart`,
      text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      rating: 8.8,
      date: `20 december 2019`,
    },
    {
      author: `drgergart`,
      text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      rating: 8.8,
      date: `21 april 2012`,
    },
  ],
};

it(`MovieReviews is rendered correctly`, () => {
  const tree = renderer.create(
      <MovieReviews film={film} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});