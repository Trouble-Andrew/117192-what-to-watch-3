import React, {createRef} from "react";
import renderer from "react-test-renderer";
import withVideo from "./with-video.jsx";
import VideoPlayer from "../../components/video-player/video-player.jsx";

const MockComponentWrapped = withVideo(VideoPlayer);

it(`withVideo is rendered correctly`, () => {
  const videoRef = createRef();
  const tree = renderer.create((
    <MockComponentWrapped
      isPlaying={false}
      ref={videoRef}
      src={``}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
