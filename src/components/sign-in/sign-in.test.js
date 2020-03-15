import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from "../sign-in/sign-in.jsx";

it(`SignIn is rendered correctly`, () => {
  const tree = renderer.create(
      <SignIn onSubmit={() => {}} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
