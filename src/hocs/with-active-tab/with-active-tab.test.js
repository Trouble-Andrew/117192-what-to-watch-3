import React from "react";
import renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab.jsx";
import films from "../../mocks/films.js";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withActiveTab(MockComponent);

it(`withActiveTab is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      film={films[0]}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
