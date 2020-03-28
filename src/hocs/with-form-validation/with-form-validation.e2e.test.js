import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withFormValidation from "./with-form-validation.jsx";

configure({adapter: new Adapter()});

const SignIn = () => {
  return <div></div>;
};

it(`Checks that HOC default should return correct state`, () => {
  const SignInWrapped = withFormValidation(SignIn);
  const wrapper = mount(<SignInWrapped />);

  expect(wrapper.state(`isValid`)).toBe(true);
  expect(wrapper.state(`submitFail`)).toBe(false);
});

it(`Checks that HOC's state isValid should return correct value`, () => {

  const SignInWrapped = withFormValidation(SignIn);
  const wrapper = mount(<SignInWrapped />);
  const instance = wrapper.instance();
  instance.invalid();

  expect(wrapper.state(`isValid`)).toBe(false);
});

it(`Checks that HOC's state submitFail should return correct value`, () => {

  const SignInWrapped = withFormValidation(SignIn);
  const wrapper = mount(<SignInWrapped />);
  const instance = wrapper.instance();
  instance.submitFail();

  expect(wrapper.state(`submitFail`)).toBe(true);
});

