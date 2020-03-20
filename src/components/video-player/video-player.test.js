import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from "../video-player/video-player.jsx";

const mock = {
  movie: {
    video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    poster: `https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SY1000_CR0,0,674,1000_AL_.jpg`,
  }
};

it(`VideoPlayer is rendered correctly`, () => {
  const {movie} = mock;

  const tree = renderer.create(<VideoPlayer
    isPlaying={true}
    src={movie.video}
    poster={movie.poster}
    startPlay={() => {}}
    stopPlay={() => {}}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
