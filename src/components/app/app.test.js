import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  date: 2014,
  genre: `Drama`
};

const films = [
  {
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
  },
  {
    title: `Jojo Rabbit`,
    date: `24.10.2019`,
    genre: [`Crime`, `Drama`, `War`],
    poster: `https://m.media-amazon.com/images/M/MV5BZjU0Yzk2MzEtMjAzYy00MzY0LTg2YmItM2RkNzdkY2ZhN2JkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SY1000_SX667_AL_.jpg`,
    posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
    rating: 8.0,
    ratingCount: 68900,
    director: [`Taika Waititi`],
    stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
    preview: `A young boy in Hitler's army finds out his mother is hiding a Jewish girl in their home.`
  },
  {
    title: `1917`,
    date: `30.01.2020`,
    genre: [`Drama`, `War`],
    poster: `https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SY1000_CR0,0,631,1000_AL_.jpg`,
    posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
    rating: 8.6,
    ratingCount: 787900,
    director: [`Sam Mendes`],
    stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
    preview: `April 6th, 1917. As a regiment assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.`
  },
  {
    title: `Joker`,
    date: `3.10.2019`,
    genre: [`Crime`, `Drama`, `Thriller`],
    poster: `https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
    posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
    rating: 8.6,
    ratingCount: 56900,
    director: [`Bong Joon Ho`],
    stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
    preview: `In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.`
  },
  {
    title: `Uncut Gems`,
    date: `25.12.2019`,
    genre: [`Crime`, `Drama`, `Thriller`],
    poster: `https://m.media-amazon.com/images/M/MV5BZDhkMjUyYjItYWVkYi00YTM5LWE4MGEtY2FlMjA3OThlYmZhXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,640,1000_AL_.jpg`,
    posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
    rating: 7.7,
    ratingCount: 5677900,
    director: [`Benny Safdie`, `Josh Safdie`],
    stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
    preview: `A charismatic New York City jeweler always on the lookout for the next big score makes a series of high-stakes bets that could lead to the windfall of a lifetime. Howard must perform a precarious high-wire act, balancing business, family, and encroaching adversaries on all sides in his relentless pursuit of the ultimate win.`
  },
  {
    title: `Knives Out`,
    date: `28.11.2019`,
    genre: [`Comedy`, `Crime`, `Drama`],
    poster: `https://m.media-amazon.com/images/M/MV5BMGUwZjliMTAtNzAxZi00MWNiLWE2NzgtZGUxMGQxZjhhNDRiXkEyXkFqcGdeQXVyNjU1NzU3MzE@._V1_SY1000_SX675_AL_.jpg`,
    posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
    rating: 8.6,
    ratingCount: 212300,
    director: [`Rian Johnson`],
    stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
    preview: `A detective investigates the death of a patriarch of an eccentric, combative family.`
  },
  {
    title: `Once Upon a Time ...in Hollywood`,
    date: `08.08.2019`,
    genre: [`Comedy`, `Drama`],
    poster: `https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
    posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
    rating: 7.7,
    ratingCount: 2234500,
    director: [`Quentin Tarantino`],
    stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
    preview: `A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age in 1969 Los Angeles.`
  },
  {
    title: `Ford v Ferrari`,
    date: `14.11.2019`,
    genre: [`Action`, `Biography`, `Drama`],
    posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
    poster: `https://m.media-amazon.com/images/M/MV5BM2UwMDVmMDItM2I2Yi00NGZmLTk4ZTUtY2JjNTQ3OGQ5ZjM2XkEyXkFqcGdeQXVyMTA1OTYzOTUx._V1_SY1000_CR0,0,675,1000_AL_.jpg`,
    rating: 8.2,
    ratingCount: 225900,
    director: [`James Mangold`],
    stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
    preview: `American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford in order to defeat Ferrari at the 24 Hours of Le Mans in 1966.`
  },
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      movieData={PromoMovie} films={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
