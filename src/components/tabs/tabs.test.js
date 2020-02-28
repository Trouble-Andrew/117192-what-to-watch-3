import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from "../tabs/tabs.jsx";


it(`Tabs is rendered correctly`, () => {
  const tree = renderer.create(
      <Tabs tab={`Overview`} handleClickTab={() => {}}/>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
