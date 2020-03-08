import React from 'react';
import renderer from 'react-test-renderer';
import VideoPlayer from "../video-player/video-player.jsx";

const mock = {
  movie: {
    video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
};

it(`VideoPlayer is rendered correctly`, () => {
  const {movie} = mock;

  const tree = renderer.create(<VideoPlayer
    isPlaying={true}
    src={movie.video}
    startPlay={() => {}}
    stopPlay={() => {}}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
