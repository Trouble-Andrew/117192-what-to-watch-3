import React from "react";
import renderer from "react-test-renderer";
import withFormValidation from "./with-form-validation.jsx";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withFormValidation(MockComponent);

it(`withFormValidation is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
