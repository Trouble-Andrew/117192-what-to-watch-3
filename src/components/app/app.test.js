import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

const PromoMovie = {
  title: `The Grand Budapest Hotel`,
  date: 2014,
  genre: `Drama`
};

const movies = [
  {title: `Fantastic Beasts: The Crimes of Grindelwald`},
  {title: `Bohemian Rhapsody`},
  {title: `Macbeth`}
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      movieData={PromoMovie} movies={movies}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
