import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in.jsx";

configure({adapter: new Adapter()});

describe(`SignIn component work correctly`, () => {
  it(`Checks SignIn component should return false`, () => {
    const onSubmit = jest.fn();
    const e = {
      target: {value: `some value`},
      preventDefault: () => {}
    };
    const signInComponent = shallow(<SignIn onSubmit={onSubmit} />);
    const emailInput = signInComponent.find(`input#user-email`);

    emailInput.simulate(`blur`, e);

    expect(signInComponent.state(`isValid`)).toBe(false);
  });

  it(`Checks SignIn component should return true`, () => {
    const onSubmit = jest.fn();
    const e = {
      target: {value: `aaa@aaa.com`},
      preventDefault: () => {}
    };
    const signInComponent = shallow(<SignIn onSubmit={onSubmit} />);
    const emailInput = signInComponent.find(`input#user-email`);

    emailInput.simulate(`blur`, e);

    expect(signInComponent.state(`isValid`)).toBe(true);
  });
});
