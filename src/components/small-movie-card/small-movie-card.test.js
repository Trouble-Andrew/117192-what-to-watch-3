import React from 'react';
import renderer from 'react-test-renderer';
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";


const film = {
  title: `Parasite`,
  date: `04.07.2019`,
  genre: [`Crime`, `Drama`, `Comedy`],
  poster: `https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
  posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
  rating: 8.6,
  ratingCount: 227900,
  director: [`Bong Joon Ho`],
  stars: [`Kang-ho Song`, `Sun-kyun Lee`, `Yeo-jeong Jo`],
  preview: `A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.`
};

it(`SmallMovieCard is rendered correctly`, () => {
  const tree = renderer.create(
      <SmallMovieCard movie={film} handleMouseEnterCard={() => {}} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
