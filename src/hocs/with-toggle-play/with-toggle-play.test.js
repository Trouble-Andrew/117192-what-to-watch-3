import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import withTogglePlay from "./with-toggle-play.jsx";
import SmallMovieCard from "../../components/small-movie-card/small-movie-card.jsx";

const mockStore = configureStore([]);

const film = {
  title: `Joker`,
  date: `3.10.2019`,
  genre: [`Crime`, `Drama`, `Thriller`],
  poster: `https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
  posterBig: `https://m.media-amazon.com/images/M/MV5BNGVmNzE2ZmEtNTBmNC00MjVjLWE2ZjgtNmNhYjJlYTIzYjQ5XkEyXkFqcGdeQXVyNzgxMzc3OTc@._V1_SX1777_CR0,0,1777,999_AL_.jpg`,
  video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  rating: 8.6,
  ratingCount: 56900,
  director: [`Bong Joon Ho`],
  stars: [`Roman Griffin Davis`, `Thomasin McKenzie`, `Scarlett Johansson`],
  preview: `In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.`
};

const MockComponentWrapped = withTogglePlay(SmallMovieCard);

it(`withTogglePlay is rendered correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    activeMovie: {},
  });
  const tree = renderer.create((
    <Provider store={store}>
      <MockComponentWrapped
        movie={film}
      />
    </Provider>
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
