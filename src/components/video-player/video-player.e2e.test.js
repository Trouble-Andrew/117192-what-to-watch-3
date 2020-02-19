import React from "react";
import Enzyme, {shallow} from "enzyme";
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

it(`VideoPlayer state contain true and false`, () => {
  const {movie} = mock;
  const ref = React.createRef();

  const main = shallow(
      <VideoPlayer ref={ref} isPlaying={true}
        src={movie.video} />
  );

  const video = main.find(`video.player__video`);

  video.simulate(`onMouseEnter`, {preventDefault() {}});

  expect(main.state(`isPlaying`)).toBe(true);
});
