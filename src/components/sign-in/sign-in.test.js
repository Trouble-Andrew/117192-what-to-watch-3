import React from 'react';
import renderer from 'react-test-renderer';
import SignIn from "../sign-in/sign-in.jsx";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history.js";

const mockStore = configureStore([]);

it(`SignIn is rendered correctly`, () => {
  const store = mockStore({
  });

  const tree = renderer.create(
      <Router
        history={history}
      >
        <Provider store={store}>
          <SignIn
            valid={() => {}}
            invalid={() => {}}
            fail={() => {}}
            isValid={true}
            submitFail={false}
          />
        </Provider>
      </Router>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
