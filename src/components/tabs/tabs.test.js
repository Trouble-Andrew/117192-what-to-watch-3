import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from "../tabs/tabs.jsx";
import films from "../../mocks/films.js";

it(`Tabs is rendered correctly`, () => {
  const tree = renderer.create(
      <Tabs movie={films[0]} tab={0} toggleTab={() => {}}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
