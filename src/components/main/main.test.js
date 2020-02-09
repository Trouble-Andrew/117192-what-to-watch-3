import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

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

describe(`Render Main`, () => {

  it(`<Main /> should render movies`, () => {
    const tree = renderer
    .create(<Main
      movieData={PromoMovie} movies={movies} onHeaderClick={() => {}}
    />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`<Main /> should render empthy list`, () => {
    const tree = renderer
    .create(<Main
      movieData={PromoMovie} movies={[]} onHeaderClick={() => {}}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
