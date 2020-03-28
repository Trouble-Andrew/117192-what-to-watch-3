import React from "react";
import renderer from "react-test-renderer";
import withFormValue from "./with-form-value.jsx";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withFormValue(MockComponent);

const user = {
  id: 1,
  email: `gg@mail.com`,
  name: `gg`,
  avatar: `https://htmlacademy-react-3.appspot.com//wtw/static/avatar/8.jpg`,
};

it(`withFormValue is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      user={user}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
