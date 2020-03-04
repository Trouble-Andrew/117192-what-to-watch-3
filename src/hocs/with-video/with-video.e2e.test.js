import React, {createRef} from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video.jsx";
import VideoPlayer from "../../components/video-player/video-player.jsx";

configure({adapter: new Adapter()});

it(`Checks that HOC's callback turn on audio (play)`, () => {
  const videoRef = createRef();
  const PlayerWrapped = withVideo(VideoPlayer);
  const wrapper = mount(<PlayerWrapped
    isPlaying={true}
    ref={videoRef}
    src={``}
  />);

  window.HTMLMediaElement.prototype.play = () => {};

  jest.spyOn(videoRef.current, `play`);

  wrapper.instance().componentDidMount();

  expect(videoRef.current.play).toHaveBeenCalledTimes(1);
});
