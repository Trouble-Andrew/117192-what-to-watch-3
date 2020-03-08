import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withActiveTab from "./with-active-tab.jsx";

configure({adapter: new Adapter()});

const Player = () => {
  return <div></div>;
};

it(`Checks that HOC default should return 0`, () => {
  const PlayerWrapped = withActiveTab(Player);
  const wrapper = mount(<PlayerWrapped />);

  expect(wrapper.state(`tab`)).toBe(0);
});

it(`Checks that HOC's callback start should return 1`, () => {
  const PlayerWrapped = withActiveTab(Player);
  const wrapper = mount(<PlayerWrapped />);
  const instance = wrapper.instance();
  instance.toggleTab(1);
  expect(wrapper.state(`tab`)).toBe(1);
});
