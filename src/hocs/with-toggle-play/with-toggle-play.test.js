import React from "react";
import renderer from "react-test-renderer";
import withTogglePlay from "./with-toggle-play.jsx";
import films from "../../mocks/films.js";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withTogglePlay(MockComponent);

it(`withTogglePlay is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      movie={films[0]}
      onPlayButtonClick={() => {}}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
