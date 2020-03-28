import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFormValue from "./with-form-value.jsx";

configure({adapter: new Adapter()});

const Review = () => {
  return <div></div>;
};

it(`Checks that HOC default should return correct state`, () => {
  const ReviewWrapped = withFormValue(Review);
  const wrapper = mount(<ReviewWrapped />);

  expect(wrapper.state(`comment`)).toBe(``);
  expect(wrapper.state(`rating`)).toBe(`3`);
  expect(wrapper.state(`isActive`)).toBe(false);
});

it(`Checks that HOC's state comment should return correct text`, () => {
  const event = {
    target: {
      name: `review-text`,
      value: `hello`,
    },
    preventDefault: () => {}
  };

  const ReviewWrapped = withFormValue(Review);
  const wrapper = mount(<ReviewWrapped />);
  const instance = wrapper.instance();
  instance.handleChangeInput(event);

  expect(wrapper.state(`comment`)).toBe(`hello`);
});

it(`Checks that HOC's state rating should return true`, () => {
  const event = {
    target: {
      name: `rating`,
      value: `5`,
    },
    preventDefault: () => {}
  };

  const ReviewWrapped = withFormValue(Review);
  const wrapper = mount(<ReviewWrapped />);
  const instance = wrapper.instance();
  instance.handleChangeInput(event);

  expect(wrapper.state(`rating`)).toBe(`5`);
});

it(`Checks that HOC's state isActive should return true`, () => {
  const event = {
    target: {
      name: `review-text`,
      value: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
    },
    preventDefault: () => {}
  };

  const ReviewWrapped = withFormValue(Review);
  const wrapper = mount(<ReviewWrapped />);
  const instance = wrapper.instance();
  wrapper.setState({rating: `5`});

  instance.handleChangeInput(event);

  expect(wrapper.state(`rating`)).toBe(`5`);
});
