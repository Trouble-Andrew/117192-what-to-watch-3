import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "../video-player/video-player.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mock = {
  movie: {
    video: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  }
};

it(`VideoPlayer state contain true`, () => {
  const {movie} = mock;

  const main = mount(
      <VideoPlayer isPlaying={true}
        src={movie.video} />
  );

  expect(main.state(`isPlaying`)).toEqual(true);
});

it(`VideoPlayer state contain false`, () => {
  const {movie} = mock;

  const main = mount(
      <VideoPlayer isPlaying={false}
        src={movie.video} />
  );

  expect(main.state(`isPlaying`)).toEqual(false);
});
