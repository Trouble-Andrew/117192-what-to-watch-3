import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "../small-movie-card/small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const film = {
  title: `Parasite`,
  date: `04.07.2019`,
  genre: `Comedy, Crime, Drama`,
  poster: `https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
  rating: 8.6,
  preview: `A poor family, the Kims, con their way into becoming the servants of a rich family, the Parks. But their easy life gets complicated when their deception is threatened with exposure.`
};

it(`Movie information gets into the handler`, () => {
  const onMouseEnter = jest.fn();

  const main = shallow(
      <SmallMovieCard movie={film} handleMouseEnterCard={onMouseEnter} />
  );

  const movieCard = main.find(`article.small-movie-card`);

  movieCard.simulate(`mouseenter`, {preventDefault() {}});

  expect(onMouseEnter).toBeCalledWith(film);
});
