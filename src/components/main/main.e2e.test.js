import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Should welcome button be pressed`, () => {
  const onHeaderClick = jest.fn();

  const main = shallow(
      <Main
        movieData={PromoMovie} movies={movies} onHeaderClick={onHeaderClick}
      />
  );

  const movieHeaders = main.find(`a.small-movie-card__link`);

  movieHeaders.forEach((it) => {
    it.props().onClick();
  });

  expect(onHeaderClick.mock.calls.length).toBe(movies.length);
});
