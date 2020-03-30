import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withTogglePlay from "./with-toggle-play.jsx";

configure({adapter: new Adapter()});

const Player = () => {
  return <div></div>;
};

it(`Checks that HOC default should return false`, () => {
  const PlayerWrapped = withTogglePlay(Player);
  const wrapper = mount(<PlayerWrapped />);

  expect(wrapper.state(`isPlay`)).toBe(false);
});

it(`Checks that HOC's callback start should return true`, () => {
  const PlayerWrapped = withTogglePlay(Player);
  const wrapper = mount(<PlayerWrapped />);
  const instance = wrapper.instance();
  instance.start();
  expect(wrapper.state(`isPlay`)).toBe(true);
});
